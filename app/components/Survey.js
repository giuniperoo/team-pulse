// @flow
import React, { Component, PropTypes } from 'react';
import { map, includes, forEach, delay, isEmpty, isBoolean } from 'lodash';
import moment from 'moment';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Haiku from './Haiku';
import Header from './Header';
import Loader from './Loader';
import Checkbox from './Checkbox';
import CardContainer from './CardContainer';
import TextQuestion from './TextQuestion';
import NumericQuestion from './NumericQuestion';
import PictoralQuestion from './PictoralQuestion';
import ButtonWithSpinner from './ButtonWithSpinner';
import styles from '../styles/Survey.css';


export default class Survey extends Component {
  static defaultProps = {
    surveyContent: {},
    userInput: [],
    anonymous: false,
    justSubmitted: false
  }

  static renderSubmittedView() {
    return (
      <div className={`icon-thumbs-up ${styles.submitted}`}>
        <h2 style={{ fontSize: '24px' }}>Next survey goes up in 3 days...</h2>
        <h2 style={{ fontSize: '21px' }}>We&#39;ll send out a notification :)</h2>
      </div>
    );
  }

  static renderJustSubmittedView() {
    return (
      <ReactCSSTransitionGroup
        transitionName="submittedContent"
        transitionAppear
        transitionAppearTimeout={300}
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}
      >
        <div key="submittedContent" className={`icon-thumbs-up ${styles.submitted}`}>
          <div className={styles.submittedContent}>
            <h2 style={{ fontSize: '30px' }}>Nicely done!</h2>
            <h2 style={{ fontSize: '24px', transform: 'translateX(100%)' }}>
              Next survey goes up in 3 days...
            </h2>
            <h2 style={{ fontSize: '21px', transform: 'translateX(200%)' }}>
              In the meantime, why not enjoy this haiku?
            </h2>
            <Haiku />
          </div>
        </div>
      </ReactCSSTransitionGroup>
    );
  }

  componentWillReceiveProps(nextProps: {
    anonymous?: boolean,
    surveyBeingFetched: boolean,
    user: { uid?: string, anonymous?: boolean, organization?: string }
  }) {
    // set anonymous toggle based on user preference
    if (!isBoolean(nextProps.anonymous) && nextProps.user.anonymous) {
      this.props.toggleAnonymous(nextProps.user.anonymous);
    }

    // fetch survey if all of the conditions are met:
    // * survey doesn't exist in store
    // * survey isn't in the process of being fetched
    // * user data exists (survey must be fetched based on user's org)
    if (
      isEmpty(this.props.surveyContent) &&
      !this.props.surveyBeingFetched &&
      !nextProps.surveyBeingFetched &&
      nextProps.user.organization) {
      this.props.fetchSurvey(nextProps.user.organization);
    }
  }

  componentWillUnmount() {
    if (this.props.justSubmitted) this.props.removeJustSubmitted();
  }

  // iterate through each question in the survey:
  // if a required question hasn't been answered,
  // a pulse animation is applied to the question
  //
  // returns true if validation succeeds, false if fails
  validate() {
    const requiredQuestionTypes = ['numeric', 'pictoral'];
    const questions = this.props.surveyContent.questions;
    const userInput = this.props.userInput;
    // eslint-disable-next-line max-len
    const requiredQuestions = map(questions, (question) => includes(requiredQuestionTypes, question.type));

    let valid = true;

    forEach(requiredQuestions, (required, index) => {
      if (required && !userInput[index]) {
        valid = false;

        // eslint-disable-next-line
        const $ref = this[`question${index}`];

        $ref.classList.add('scalePulse');
        delay(() => $ref.classList.remove('scalePulse'), 500);
      }
    });

    return valid;
  }

  submit() {
    const userInput = this.props.userInput;
    const userId = !this.props.anonymous ? this.props.user.uid : null;
    this.props.submitSurvey(this.props.surveyKey, userInput, userId);
  }

  validateAndSubmit() {
    const valid = this.validate();
    if (valid) this.submit();
  }

  prepareSurveyQuestions() {
    const userInput = this.props.userInput;
    const questions = this.props.surveyContent.questions;
    const components = [];

    questions.forEach((question, index) => {
      if (!question) return;

      /* eslint-disable react/no-array-index-key */
      // NB: using array index as key should be fine here - the array is static
      switch (question.type) {
        case 'numeric':
          components.push(
            /* eslint-disable */
            <NumericQuestion
              key={index}
              domRef={$elem => this[`question${index}`] = $elem}
              title={question.title}
              value={userInput[index]}
              labelMin={question.labelMin}
              labelMax={question.labelMax}
              surveyPosition={index + 1}
              onClick={(value, position) => this.props.setUserInput(value, position)}
            />);
            /* eslint-enable */
          break;
        case 'pictoral':
          components.push(
            /* eslint-disable */
            <PictoralQuestion
              key={index}
              domRef={$elem => this[`question${index}`] = $elem}
              title={question.title}
              value={userInput[index]}
              surveyPosition={index + 1}
              onClick={(value, position) => this.props.setUserInput(value, position)}
            />);
            /* eslint-enable */
          break;
        default: // text
          components.push(
            <TextQuestion
              key={index}
              title={question.title}
              value={userInput[index]}
              classes={styles.surveyTextQuestion}
              surveyPosition={index + 1}
              onBlur={(value, position) => this.props.setUserInput(value, position)}
            />);
      /* eslint-enable react/no-array-index-key */
      }
    });

    return components;
  }

  renderSurvey() {
    const surveyTitle = this.props.surveyContent.surveyTitle;
    const startDate = this.props.surveyContent.start && moment(this.props.surveyContent.start).format('MMM Do, YYYY');

    return (
      <CardContainer header={surveyTitle} icon="feedback" startDate={startDate}>
        <div className={styles.surveyFormContainer}>
          {this.prepareSurveyQuestions()}
          <hr />
          <Checkbox
            id="anonymousCheckbox"
            label="Anonymous"
            classes={styles.surveyCheckbox}
            isChecked={this.props.anonymous || false}
            onClick={() => { this.props.toggleAnonymous(); }}
          />
          <ButtonWithSpinner
            label="Submit"
            onClick={() => this.validateAndSubmit()}
            buttonSpinnerActive={this.props.buttonSpinnerActive}
          />
        </div>
      </CardContainer>
    );
  }

  // render loader, survey, 'submitted' view, or 'just submitted' view
  renderContent() {
    if (isEmpty(this.props.surveyContent) && !this.props.offline) return <Loader />;

    if (this.props.justSubmitted) return Survey.renderJustSubmittedView();

    if (this.props.surveyKey && this.props.surveyKey === localStorage.getItem('lastSubmittedSurvey')) {
      return Survey.renderSubmittedView();
    }

    if (isEmpty(this.props.surveyContent) && this.props.offline) return <div />;

    return this.renderSurvey();
  }

  render() {
    return (
      <section className={styles.survey}>
        <Header activeTab="survey" {...this.props} />
        <div className="tabContainer">
          {this.renderContent()}
        </div>
      </section>
    );
  }
}

Survey.propTypes = {
  anonymous: PropTypes.bool,
  offline: PropTypes.bool.isRequired,
  justSubmitted: PropTypes.bool,
  surveyKey: PropTypes.string.isRequired,
  fetchSurvey: PropTypes.func.isRequired,
  submitSurvey: PropTypes.func.isRequired,
  setUserInput: PropTypes.func.isRequired,
  toggleAnonymous: PropTypes.func.isRequired,
  surveyBeingFetched: PropTypes.bool.isRequired,
  removeJustSubmitted: PropTypes.func.isRequired,
  buttonSpinnerActive: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    uid: PropTypes.string,
    anonymous: PropTypes.bool,
    organization: PropTypes.string
  }).isRequired,
  userInput: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ])
  ),
  // eslint-disable-next-line react/forbid-prop-types
  surveyContent: PropTypes.object
};

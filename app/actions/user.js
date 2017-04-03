// @flow
import * as firebase from 'firebase';

export const userActionTypes = {
  TOGGLE_DEFAULT_ANONYMOUS_SUCCESS: 'TOGGLE_DEFAULT_ANONYMOUS_SUCCESS',
  TOGGLE_DEFAULT_ANONYMOUS_ERROR: 'TOGGLE_DEFAULT_ANONYMOUS_ERROR',
  UPDATE_USER_PHOTO_URL: 'UPDATE_USER_PHOTO_URL'
};

export const toggleDefaultAnonymousSuccess = () => ({
  type: userActionTypes.TOGGLE_DEFAULT_ANONYMOUS_SUCCESS
});

export const toggleDefaultAnonymousError = () => ({
  type: userActionTypes.TOGGLE_DEFAULT_ANONYMOUS_ERROR
});

export const updateUserPhotoUrl = (user: {}) => ({
  type: userActionTypes.UPDATE_USER_PHOTO_URL,
  user
});

// eslint-disable-next-line flowtype/no-weak-types
export const toggleDefaultAnonymous = (uid: string, toggle: boolean) => (dispatch: Function) => {
  const userRef = firebase.database().ref(`users/${uid}`);

  userRef.update({ anonymous: toggle })
    .then(() => dispatch(toggleDefaultAnonymousSuccess()))
    .catch(error => dispatch(toggleDefaultAnonymousError(error)));
};

// eslint-disable-next-line flowtype/no-weak-types
export const uploadAvatar = (uid: string, image: File) => (dispatch: Function) => {
  const avatarRef = firebase.storage().ref(`avatars/${uid}`);
  const metadata = { contentType: image.type };

  avatarRef.put(image, metadata)
    .then(snapshot => {
      // Avatar image has been successfully saved to Firebase storage,
      // Now update the photo URL in user's profile
      const user = firebase.auth().currentUser;
      return user.updateProfile({ photoURL: snapshot.downloadURL })
        .then(
          () => dispatch(updateUserPhotoUrl(user)),
          error => console.error(error)
        );
    })
    .catch(error => console.error(error));
};

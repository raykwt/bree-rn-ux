## UX Enhancement

The purpose for the workspace is to showcase the potential ux enhancement app. This repository focuses on improving the user experience of password validation, while other components are designed with minimalistic aesthetics and functionality.

**Current Design**

The password validation error message lacks clarity because all the requirement are combined into a single message, making it difficult for users to identify which specific requirement their current password fails to meet. This design does not scale well when we add additional requirement e.g. include special character, include upper case character and include lower case character.

<img src="https://github.com/user-attachments/assets/826b8cfd-0ea4-4384-a71d-f477882732cb" width="360" height="720">

**Proposed Design**

The proposed design introduces a layout where each password requirement is listed with a corresponding checkmark to indicate whether it has been fulfilled. This approach provides better readability and helps users identify which requirements are met and which need attention.

Demo video

https://github.com/user-attachments/assets/c39b53bc-3c38-45b3-a700-08061b3f22de

**Run on iOS device with Expo GO**

```
npx expo start
```

For other options please refer to https://docs.expo.dev/get-started/set-up-your-environment/?platform=ios&device=simulated&mode=expo-go

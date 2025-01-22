## UX Enhancement
The purpose for the workspace is to showcase the potential ux enhancement app. This repository focuses on improving the user experience of password validation, while other components are designed with minimalistic aesthetics and functionality.

**Current Design**
The password validation error message lacks clarity because all the requirement are combined into a single message, making it difficult for users to identify which specific requirement their current password fails to meet. This design does not scale well when we add additional requirement e.g. include special character, include upper case character and include lower case character.

**Proposed Design**
The proposed design introduces a layout where each password requirement is listed with a corresponding checkmark to indicate whether it has been fulfilled. This approach provides better clarity and helps users identify which requirements are met and which need attention.

**Run on iOS**
```bash
# install dependencies
yarn

# setup bundler (first setup only)
bundle install

# pod install
bundle exec pod install

# back to root directory
cd ../

# run app on iOS
yarn ios

```
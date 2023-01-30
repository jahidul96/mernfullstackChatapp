import {StyleSheet} from 'react-native';
import {AppColors} from '../../utils/AppColors';

export const authStyles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: AppColors.DEEPBLUE,
  },
  registerText: {
    marginBottom: 20,
    fontSize: 22,
    fontWeight: 'bold',
    color: AppColors.WHITE,
  },
  linkTextWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  linkWrapper: {
    marginTop: 10,
  },
  extraTextStyle: {
    color: AppColors.WHITE,
  },
  btnExtraStyle: {
    borderWidth: 1,
    borderColor: AppColors.WHITE,
    marginTop: 10,
  },
});

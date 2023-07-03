import Text from './Text';
import FormikTextInput from './FormikTextInput';
import {Pressable, StyleSheet, View} from 'react-native';
import theme from '../theme';
import {Formik} from 'formik';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import {useNavigate} from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    padding: 20,
  },
  button: {
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    borderRadius: 10,
  },
  text: {
    color: theme.colors.textWhite,
    fontWeight: 'bold',
    paddingVertical: 15,
  }
});

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().min(5, 'Password is too weak, must be at least 5 chars long').required('Password is required'),
});

export const SignInContainer = ({submit}) => {
  return (
    <View style={styles.container}>
      <Formik initialValues={{username: '', password: '',}} onSubmit={submit} validationSchema={validationSchema}>
        {({handleSubmit}) => <>
          <FormikTextInput name="username" placeholder="username" secureTextEntry={false} borderRadius={5} />
          <FormikTextInput name="password" placeholder="password" secureTextEntry={true} borderRadius={5} />
          <Pressable style={styles.button} onPress={handleSubmit}>
            <Text style={styles.text}>Sign in</Text>
          </Pressable>
        </>}
      </Formik>
    </View>
  );
}

const SignIn = () => {
  const navigate = useNavigate();
  const [signIn] = useSignIn();

  const submit = async (values) => {
    const {username, password} = values;
    try {
      const {data} = await signIn({username, password});
      navigate('/repositories');
    } catch (error) {
      console.log('error:', error);
    }
  };

  return (<SignInContainer submit={submit} />);
};

export default SignIn;

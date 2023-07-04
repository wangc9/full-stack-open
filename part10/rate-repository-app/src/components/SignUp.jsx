import {Button, StyleSheet, View} from 'react-native';
import * as yup from 'yup';
import {Formik} from 'formik';
import FormikTextInput from './FormikTextInput';
import useSignUp from '../hooks/useSignUp';
import {useNavigate} from 'react-router-native';
import useSignIn from '../hooks/useSignIn';

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    padding: 20,
  },
});

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required').min(5, 'Username should be at least 5 characters long').max(30, 'Username should be no longer than 30 characters'),
  password: yup.string().required('Password is required').min(5, 'Password should be at least 5 characters long').max(30, 'Password should be no longer than 30 characters'),
  confirm: yup.string().oneOf([yup.ref('password'), null], 'Passwords do not match').required(`Password confirmation is required`)
});

export const SignUpContainer = ({submit}) => {
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          username: '',
          password: '',
          confirm: '',
        }}
        onSubmit={submit}
        validationSchema={validationSchema}
      >
        {({handleSubmit}) => (
          <>
            <FormikTextInput name='username' placeholder='username' borderRadius={5} />
            <FormikTextInput name='password' placeholder='password' borderRadius={5} secureTextEntry={true} />
            <FormikTextInput name='confirm' placeholder='Type password again to confirm' borderRadius={5} secureTextEntry={true} />
            <Button title='Sign Up' onPress={handleSubmit} />
          </>
        )}
      </Formik>
    </View>
  );
};

const SignUp = () => {
  const [userSignUp] = useSignUp();
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const submit = async (values) => {
    const {username, password, confirm} = values;
    console.log(username, password);
    try {
      const {data} = await userSignUp({username, password, confirm});
      if (data) {
        await signIn({username, password});
        navigate('/repositories');
      }
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
    }

  };

  return (<SignUpContainer submit={submit} />);
};

export default SignUp;

import Text from './Text';
import FormikTextInput from './FormikTextInput';
import {Pressable, StyleSheet, View} from 'react-native';
import theme from '../theme';
import {Formik} from 'formik';

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    padding: 5,
  },
  button: {
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
  },
  text: {
    color: theme.colors.textWhite,
    fontWeight: 'bold',
    paddingVertical: 7,
  }
})
const SignIn = () => {
  const submit = (values) => {
    console.log(values);
  }
  return (
    <View style={styles.container}>
      <Formik initialValues={{username: '', password: '',}} onSubmit={submit}>
        {({handleSubmit}) => <>
          <FormikTextInput name="username" placeholder="username" secureTextEntry={false}/>
          <FormikTextInput name="password" placeholder="password" secureTextEntry={true} />
          <Pressable style={styles.button} onPress={handleSubmit}>
            <Text style={styles.text}>Sign in</Text>
          </Pressable>
        </>}
      </Formik>
    </View>
  );
};

export default SignIn;

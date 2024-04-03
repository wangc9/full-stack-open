import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import * as yup from 'yup';
import Text from './Text';
import { Formik } from 'formik';
import theme from '../theme';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';
import useSignUp from '../hooks/useSignUp';

const styles = StyleSheet.create({
  container: {
    padding: theme.fontSizes.body,
    backgroundColor: theme.colors.navButton,
  },
  text: {
    borderColor: theme.colors.textSecondary,
    borderWidth: 1,
    borderRadius: 4,
    paddingLeft: theme.fontSizes.body,
    paddingVertical: theme.fontSizes.body,
    marginBottom: theme.fontSizes.body,
    fontSize: theme.fontSizes.subheading,
  },
  button: {
    paddingVertical: theme.fontSizes.body,
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
  },
  buttonText: {
    alignSelf: 'center',
    fontSize: theme.fontSizes.subheading,
    color: theme.colors.navButton,
    fontWeight: theme.fontWeights.bold,
  },
});

const validationSchema = yup.object().shape({
  Username: yup
    .string()
    .required('Username is required')
    .min(5, 'The username should be at least 5 characters long')
    .max(30, 'The username should be no longer than 30 characters'),
  Password: yup
    .string()
    .required('Password is required')
    .min(5, 'The password should be at least 5 characters long')
    .max(30, 'The password should be no longer than 30 characters'),
  PasswordConfirm: yup
    .string()
    .oneOf(
      [yup.ref('Password'), null],
      'Please make sure that the passwords are the same'
    )
    .required('Please type in the password once again'),
});

export function SignUpContainer({ onSubmit }) {
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          Username: '',
          Password: '',
          PasswordConfirm: '',
        }}
        onSubmit={onSubmit}
        style={styles.container}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <View>
            {errors.Username && (
              <Text style={{ color: 'red' }}>{errors.Username}</Text>
            )}
            <TextInput
              onChangeText={handleChange('Username')}
              onBlur={handleBlur('Username')}
              value={values.Username}
              placeholder="Username"
              style={{
                ...styles.text,
                borderColor: errors.Username
                  ? 'red'
                  : theme.colors.textSecondary,
              }}
              testID="username"
            />
            {errors.Password && (
              <Text style={{ color: 'red' }}>{errors.Password}</Text>
            )}
            <TextInput
              onChangeText={handleChange('Password')}
              onBlur={handleBlur('Password')}
              value={values.Password}
              placeholder="Password"
              style={{
                ...styles.text,
                borderColor: errors.Password
                  ? 'red'
                  : theme.colors.textSecondary,
              }}
              secureTextEntry
              testID="password"
            />
            {errors.PasswordConfirm && (
              <Text style={{ color: 'red' }}>{errors.PasswordConfirm}</Text>
            )}
            <TextInput
              onChangeText={handleChange('PasswordConfirm')}
              onBlur={handleBlur('PasswordConfirm')}
              value={values.PasswordConfirm}
              placeholder="Password confirmation"
              style={{
                ...styles.text,
                borderColor: errors.PasswordConfirm
                  ? 'red'
                  : theme.colors.textSecondary,
              }}
              secureTextEntry
              testID="password-confirmation"
            />
            <Pressable
              style={({ pressed }) =>
                pressed
                  ? {
                      ...styles.button,
                      backgroundColor: theme.colors.pressedButton,
                    }
                  : styles.button
              }
              onPress={handleSubmit}
              testID="submit"
            >
              <Text style={styles.buttonText}>Sign up</Text>
            </Pressable>
          </View>
        )}
      </Formik>
    </View>
  );
}

export default function SignUp() {
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { Username, Password } = values;
    try {
      const { createUser } = await signUp({
        username: Username,
        password: Password,
      });
      if (createUser.username) {
        await signIn({
          username: createUser.username,
          password: Password,
        });
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return <SignUpContainer onSubmit={onSubmit} />;
}

import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import * as yup from 'yup';
import Text from './Text';
import { Formik } from 'formik';
import theme from '../theme';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';

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
  Username: yup.string().required('Username is required'),
  Password: yup.string().required('Password is required'),
});

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { Username, Password } = values;
    try {
      const { authenticate } = await signIn({
        username: Username,
        password: Password,
      });
      if (authenticate.accessToken) {
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          Username: '',
          Password: '',
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
            >
              <Text style={styles.buttonText}>Sign in</Text>
            </Pressable>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default SignIn;

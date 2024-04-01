import { Button, Pressable, StyleSheet, TextInput, View } from 'react-native';
import Text from './Text';
import { Field, Form, Formik } from 'formik';
import theme from '../theme';

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

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
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
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <TextInput
              onChangeText={handleChange('Username')}
              onBlur={handleBlur('Username')}
              value={values.Username}
              placeholder="Username"
              style={styles.text}
            />
            <TextInput
              onChangeText={handleChange('Password')}
              onBlur={handleBlur('Password')}
              value={values.Password}
              placeholder="Password"
              style={styles.text}
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

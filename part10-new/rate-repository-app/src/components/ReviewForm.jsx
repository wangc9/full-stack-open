import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import * as yup from 'yup';
import Text from './Text';
import { Formik } from 'formik';
import theme from '../theme';
import useCreateReview from '../hooks/useCreateReview';
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
  owner: yup.string().required('Repository owner name is required'),
  name: yup.string().required('Repository name is required'),
  rating: yup
    .number()
    .required('Rating is required')
    .min(0, 'Rating should be at least 0')
    .max(100, 'Rating should be at most 100'),
  review: yup.string(),
});

export function ReviewFormContainer({ onSubmit }) {
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          owner: '',
          name: '',
          rating: '',
          review: '',
        }}
        onSubmit={onSubmit}
        style={styles.container}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <View>
            {errors.owner && (
              <Text style={{ color: 'red' }}>{errors.owner}</Text>
            )}
            <TextInput
              onChangeText={handleChange('owner')}
              onBlur={handleBlur('owner')}
              value={values.owner}
              placeholder="Repository owner name"
              style={{
                ...styles.text,
                borderColor: errors.owner ? 'red' : theme.colors.textSecondary,
              }}
              testID="owner"
            />
            {errors.name && <Text style={{ color: 'red' }}>{errors.name}</Text>}
            <TextInput
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
              placeholder="Repository name"
              style={{
                ...styles.text,
                borderColor: errors.name ? 'red' : theme.colors.textSecondary,
              }}
              testID="name"
            />
            {errors.rating && (
              <Text style={{ color: 'red' }}>{errors.rating}</Text>
            )}
            <TextInput
              onChangeText={handleChange('rating')}
              onBlur={handleBlur('rating')}
              value={values.rating}
              placeholder="Rating between 0 and 100"
              style={{
                ...styles.text,
                borderColor: errors.rating ? 'red' : theme.colors.textSecondary,
              }}
              testID="rating"
            />
            {errors.review && (
              <Text style={{ color: 'red' }}>{errors.review}</Text>
            )}
            <TextInput
              onChangeText={handleChange('review')}
              onBlur={handleBlur('review')}
              value={values.review}
              placeholder="Review"
              style={{
                ...styles.text,
                borderColor: errors.review ? 'red' : theme.colors.textSecondary,
              }}
              multiline
              testID="name"
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
              <Text style={styles.buttonText}>Create a review</Text>
            </Pressable>
          </View>
        )}
      </Formik>
    </View>
  );
}

export default function ReviewForm() {
  const [createNewReview] = useCreateReview();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { owner, name, rating, review } = values;
    try {
      const { createReview } = await createNewReview({
        owner,
        name,
        rating,
        review,
      });
      if (createReview.id) {
        navigate(`/${createReview.repositoryId}`);
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  return <ReviewFormContainer onSubmit={onSubmit} />;
}

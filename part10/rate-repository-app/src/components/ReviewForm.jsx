import FormikTextInput from './FormikTextInput';
import {Button, StyleSheet, View} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useNavigate} from 'react-router-native';
import useCreateReview from '../hooks/useCreateReview';

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    padding: 20,
  },
});

const validationSchema = yup.object().shape({
  username: yup.string().required("Owner's username is missing"),
  name: yup.string().required('Name of the repository is missing'),
  rating: yup.number().required('Rating of the repository is missing').min(0, 'Rating should be higher than 0').max(100, 'Rating should be lower than 100'),
  review: yup.string()
});

export const ReviewFormContainer = ({submit}) => {
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          username: '',
          name: '',
          rating: 0,
          review: '',
        }}
        onSubmit={submit}
        validationSchema={validationSchema}
      >
        {({handleSubmit}) => (<>
          <FormikTextInput name='username' placeholder='username' borderRadius={5} />
          <FormikTextInput name='name' placeholder='name' borderRadius={5} />
          <FormikTextInput name='rating' placeholder='rating' borderRadius={5} />
          <FormikTextInput name='review' placeholder='review' borderRadius={5} multiline={true} />
          <Button title='Review' onPress={handleSubmit} />
        </>)}
      </Formik>
    </View>
  );
};

const ReviewForm = () => {
  const navigate = useNavigate();
  const [createReview] = useCreateReview();

  const submit = async (values) => {
    const {username, name, rating, review} = values;
    try {
      const {data} = await createReview({username, name, rating, review});
      console.log(data);
      navigate(`/repositories/${data.createReview.repositoryId}`);
    } catch (error) {
      console.log('error: ', JSON.stringify(error, null, 2));
    }
  };

  return (<ReviewFormContainer submit={submit} />)
};

export default ReviewForm;

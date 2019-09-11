import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { TextInput, Button } from 'react-native-paper';
import { addNoteForTalk } from '../../firebase/notes';
import { StyleSheet, ScrollView } from 'react-native';

const AddNote = props => {
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmitPress = () => {
    const { talkId } = props.navigation.state.params;
    setLoading(true);
    addNoteForTalk(talkId, note)
      .then(() => {
        props.navigation.goBack();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <MainLayout title="Add Note" icon="arrow-left">
      <ScrollView contentContainerStyle={styles.mainContainerStyle}>
        <TextInput
          placeholder="Add note"
          value={note}
          onChangeText={text => setNote(text)}
          mode="outlined"
          multiline
          height={200}
          numberOfLines={8}
          style={styles.inputTextStyle}
        />
        {note && (
          <Button
            mode="contained"
            loading={loading}
            dark
            disabled={loading}
            style={styles.buttonStyle}
            onPress={onSubmitPress}
          >
            Submit
          </Button>
        )}
      </ScrollView>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  rootContainerStyle: {
    flex: 1,
  },
  mainContainerStyle: {
    padding: 15,
  },
  inputTextStyle: {},
  buttonStyle: {
    paddingVertical: 7,
    marginTop: 20,
  },
});

export default AddNote;

import React, { useState } from 'react';
import { Text } from 'react-native';
import AuthLayout from '../../layouts/AuthLayout';
import { Button, TextInput, Card } from 'react-native-paper';
import { signupWithEmail } from '../../firebase/auth';

const Register = ({ navigation }) => {
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const handleInputChange = (name, text) => {
    setSignupData({ ...signupData, [name]: text });
  };

  const signupUser = async () => {
    setLoading(true);
    await signupWithEmail(signupData);
    setLoading(false);
    navigation.navigate('Home');
  };
  return (
    <AuthLayout>
      <Card elevation={2} style={{ margin: 16 }}>
        <Card.Content>
          <Text
            style={{ fontWeight: 'bold', fontSize: 18, alignSelf: 'center' }}
          >
            Sign Up
          </Text>
          <TextInput
            label="Name"
            mode="outlined"
            style={{ marginTop: 8 }}
            value={signupData.name}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={text => handleInputChange('name', text)}
          />
          <TextInput
            label="Email"
            mode="outlined"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={signupData.email}
            onChangeText={text => handleInputChange('email', text)}
            style={{ marginTop: 8 }}
          />
          <TextInput
            label="Password"
            mode="outlined"
            value={signupData.password}
            secureTextEntry
            onChangeText={text => handleInputChange('password', text)}
            style={{ marginTop: 8 }}
          />
          <Button
            dark
            mode="contained"
            loading={loading}
            onPress={signupUser}
            style={{ marginTop: 16 }}
          >
            Sign Up
          </Button>
        </Card.Content>
      </Card>
    </AuthLayout>
  );
};

export default Register;

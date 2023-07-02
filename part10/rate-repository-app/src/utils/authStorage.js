import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace
  }

  async getAccessToken() {
    const token = await AsyncStorage.getItem(`${this.namespace}:token`);
    return token ? JSON.parse(token) : null;
  }

  async clearAccessToken() {
    await AsyncStorage.removeItem(`${this.namespace}:token`);
  }

  async setAccessToken(accessToken) {
    await this.clearAccessToken();
    await AsyncStorage.setItem(`${this.namespace}:token`, JSON.stringify(accessToken));
  }
}

export default AuthStorage;

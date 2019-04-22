import React from "react";
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View
} from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded
} from "expo";
import { Provider as PaperProvider } from "react-native-paper";

class ScreenOne extends React.Component {
  static navigationOptions = {
    title: "+234 (0) 8089932783"
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.button}>
          <Button title="Screen Two!" onPress={this._two} />
          <Button
            title="Interstitial"
            onPress={this.showInterstitial}
            containerViewStyle={styles.interstitialBanner}
          />
          <Button
            title="Rewarded"
            onPress={this.showRewarded}
            containerViewStyle={styles.rewardedBanner}
          />
        </View>
        <AdMobBanner
          bannerSize="fullBanner"
          style={styles.bottomBanner}
          adUnitID="ca-app-pub-3940256099942544/6300978111"
          onDidFailToReceiveAdWithError={this.bannerError}
        />

        <PublisherBanner
          bannerSize="fullBanner"
          style={styles.topBanner}
          adUnitID="ca-app-pub-3940256099942544/6300978111"
          onDidFailToReceiveAdWithError={this.bannerError}
          onAdMobDispatchAppEvent={this.adMobEvent}
        />
      </View>
    );
  }

  _two = () => {
    this.props.navigation.navigate("Two");
  };
}

class ScreenTwo extends React.Component {
  static navigationOptions = {
    title: "Welcome to the app!"
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Show me more of the app" onPress={this._showMoreApp} />
        <Button title="Actually, sign me out :)" onPress={this._signOutAsync} />
      </View>
    );
  }

  _showMoreApp = () => {
    this.props.navigation.navigate("Three");
  };

  _signOutAsync = () => {
    this.props.navigation.navigate("One");
  };
}

class ScreenThree extends React.Component {
  static navigationOptions = {
    title: "Lots of features here"
  };

  _four = () => {
    this.props.navigation.navigate("Four");
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="I'm done, sign me out" onPress={this._signOutAsync} />
        <Button title="I'm done, sign me out" onPress={this._four} />
        <StatusBar barStyle="default" />
      </View>
    );
  }

  _signOutAsync = () => {
    this.props.navigation.navigate("Auth");
  };
}

class ScreenFour extends React.Component {
  _one = async () => {
    this.props.navigation.navigate("One");
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <Button title="Reward" onPress={this._signOutAsync} />
        <Button title="One" onPress={this._one} />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const AppStack = createStackNavigator({
  One: ScreenOne,
  Two: ScreenTwo,
  Three: ScreenThree,
  Four: ScreenFour
});
const AppContainer = createAppContainer(AppStack);

export default function App() {
  return (
    <PaperProvider>
      <AppContainer />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  rewardedBanner: {
    width: "100%",
    marginLeft: 0
  },
  interstitialBanner: {
    width: "100%",
    marginLeft: 0
  },
  bottomBanner: {
    position: "absolute",
    bottom: 0
  },
  topBanner: {
    position: "absolute",
    top: "5%"
  },
  button: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center"
  }
});

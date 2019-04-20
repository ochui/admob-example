import React from "react";
import { StyleSheet, View, Button } from "react-native";
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded
} from "expo";

export default class App extends React.Component {
  bannerError = e => {
    console.log("An error", e);
    return;
  };

  componentDidMount = async () => {
    console.log("--------");
    AdMobInterstitial.setAdUnitID("ca-app-pub-3940256099942544/1033173712");
    AdMobRewarded.setAdUnitID("ca-app-pub-3940256099942544/5224354917");
    try {
      await AdMobRewarded.requestAdAsync();
    } catch (error) {
      console.log(error);
    }

    try {
      await AdMobInterstitial.requestAdAsync();
    } catch (error) {
      console.log(error);
    }
  };
  showInterstitial = async () => {
    try {
      await AdMobInterstitial.showAdAsync();
    } catch (error) {
      console.log(error);
    }
  };

  showRewarded = async () => {
    try {
      await AdMobRewarded.showAdAsync();
    } catch (error) {
      console.log(error);
    }
  };

  adMobEvent = () => {
    console.log("event");
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.button}>
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
}

const styles = StyleSheet.create({
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
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    //alignItems: "center",
    justifyContent: "center"
  }
});

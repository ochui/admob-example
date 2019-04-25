import React from "react";
import { StyleSheet, View, Button, TextInput } from "react-native";
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
  KeepAwake
} from "expo";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { log: "", awardedBotton: true, interstitialBotton: true };
  }

  componentDidMount = async () => {
    AdMobInterstitial.setTestDeviceID("EMULATOR");
    AdMobRewarded.setTestDeviceID("EMULATOR");
    this._log("starting application\n");
    AdMobInterstitial.setAdUnitID("ca-app-pub-3940256099942544/1033173712"); //ca-app-pub-7832155073875042/2659325618
    AdMobRewarded.setAdUnitID("ca-app-pub-3940256099942544/1033173712"); //ca-app-pub-7832155073875042/2213916130
    this._log("Application is Ready to Make Request\n");

    //Request ads from google admob
    try {
      this._log("Requesting rewarded ads\n");
      await AdMobRewarded.requestAdAsync();
      this._log("Rewarded ads Loaded\n");
      this.setState({ awardedBotton: false });
    } catch (error) {
      if (error.code == "E_AD_ALREADY_LOADED") {
        this.setState({ awardedBotton: false });
      }
      this._log(`Rewarded ads request failed (${error.code})\n`);
    }

    try {
      this._log("requesting Interstitial ads\n");
      await AdMobInterstitial.requestAdAsync();
      this._log("Interstitial ads Loaded\n");
      this.setState({ interstitialBotton: false });
    } catch (error) {
      this._log(`Interstitial ads request faild (${error.code})\n`);
    }

    //-----Register event handlers // optional
    AdMobInterstitial.addEventListener("interstitialDidLoad", () =>
      this._log("interstitialDidLoad \n")
    );

    AdMobInterstitial.addEventListener("interstitialDidFailToLoad", () =>
      this._log("interstitialDidFailToLoad \n")
    );

    AdMobInterstitial.addEventListener("interstitialDidOpen", () =>
      this._log("interstitialDidOpen \n")
    );
    AdMobInterstitial.addEventListener("interstitialDidClose", () =>
      this._log("interstitialDidClose \n")
    );
    AdMobInterstitial.addEventListener("interstitialWillLeaveApplication", () =>
      this._log("interstitialWillLeaveApplication \n")
    );

    AdMobRewarded.addEventListener("rewardedVideoDidRewardUser", () =>
      this._log("rewardedVideoDidRewardUser \n")
    );
    AdMobRewarded.addEventListener("rewardedVideoDidLoad", () =>
      this._log("rewardedVideoDidLoad \n")
    );
    AdMobRewarded.addEventListener("rewardedVideoDidFailToLoad", () =>
      this._log("rewardedVideoDidFailToLoad \n")
    );
    AdMobRewarded.addEventListener("rewardedVideoDidOpen", () =>
      this._log("rewardedVideoDidOpen \n")
    );
    AdMobRewarded.addEventListener("rewardedVideoDidClose", () =>
      this._log("rewardedVideoDidClose \n")
    );
    AdMobRewarded.addEventListener("rewardedVideoWillLeaveApplication", () =>
      this._log("rewardedVideoWillLeaveApplication \n")
    );
  };

  //show interstitial ads
  showInterstitial = async () => {
    try {
      await AdMobInterstitial.showAdAsync();
    } catch (error) {
      this._log(error + "\n");
    }
  };

  //show reward ads
  showRewarded = async () => {
    try {
      await AdMobRewarded.showAdAsync();
    } catch (error) {
      this._log(error + "\n");
    }
  };

  bannerTwoEvent = e => {
    this._log(`Banner Two (${e}) \n`);
  };

  bannerOneEvent = e => {
    this._log(`Banner One (${e}) \n`);
  };

  _log = log => {
    this.setState({ log: this.state.log + log });
  };

  bannerOneError = e => {
    this._log(`Banner One (${e}) \n`);
    return;
  };

  bannerTwoError = e => {
    this._log(`Banner Two (${e}) \n`);
    return;
  };
  componentWillUnmount() {
    // remove all event listeners for interstitial/rewarded ads
    AdMobInterstitial.removeAllListeners();
    AdMobRewarded.removeAllListeners();
  }

  render() {
    return (
      <View style={styles.container}>
        <KeepAwake />
        <View style={styles.botton}>
          <View style={styles.buttonOne}>
            <Button
              title="Interstitial"
              color="powderblue"
              disabled={this.state.interstitialBotton}
              onPress={this.showInterstitial}
              containerViewStyle={styles.interstitialBanner}
            />
          </View>
          <View style={styles.buttonTwo}>
            <Button
              title="Rewarded"
              disabled={this.state.awardedBotton}
              onPress={this.showRewarded}
              containerViewStyle={styles.rewardedBanner}
            />
          </View>
        </View>
        <AdMobBanner
          bannerSize="fullBanner"
          style={styles.bottomBanner}
          adUnitID="ca-app-pub-3940256099942544/6300978111" //ca-app-pub-7832155073875042/6295318298
          onDidFailToReceiveAdWithError={this.bannerOneError}
        />

        <View style={styles.log}>
          <TextInput
            style={{ borderColor: "white", borderWidth: 1 }}
            value={this.state.log}
            //scrollEnabled={true}
            editable={false}
            multiline={true}
            numberOfLines={4}
          />
        </View>

        <PublisherBanner
          bannerSize="fullBanner"
          style={styles.topBanner}
          adUnitID="ca-app-pub-3940256099942544/6300978111" //ca-app-pub-7832155073875042/1283977849
          onDidFailToReceiveAdWithError={this.bannerError}
          onAdMobDispatchAppEvent={this.bannerTwoEvent}
          onDidFailToReceiveAdWithError={this.bannerTwoError}
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
  botton: {
    flexDirection: "row",
    justifyContent: "center",
    top: "90%"
  },
  buttonTwo: {
    flex: 1
  },
  buttonOne: {
    flex: 1,
    height: 30
  },
  log: {
    top: 80,
    backgroundColor: "#fff",
    height: 70
  },
  container: {
    flex: 1,
    backgroundColor: "#000"
    //alignItems: "center",
    //justifyContent: "center"
  }
});

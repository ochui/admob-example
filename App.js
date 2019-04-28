import React from "react";
import {
  StyleSheet,
  View,
  Button,
  TextInput,
  ScrollView,
  Text
} from "react-native";
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
    this.scroll = null;
    this.state = { logs: [], awardedBotton: true, interstitialBotton: true };
  }

  componentDidMount = async () => {
    AdMobInterstitial.setTestDeviceID("EMULATOR");
    AdMobRewarded.setTestDeviceID("EMULATOR");
    this._log({ msg: "starting application\n", info: true });
    AdMobInterstitial.setAdUnitID("ca-app-pub-3940256099942544/1033173712"); //ca-app-pub-7832155073875042/2659325618
    AdMobRewarded.setAdUnitID("ca-app-pub-3940256099942544/1033173712"); //ca-app-pub-7832155073875042/2213916130
    this._log({ msg: "Application is Ready to Make Request\n", info: true });

    //Request ads from google admob
    try {
      this._log({ msg: "Requesting rewarded ads\n", info: true });
      await AdMobRewarded.requestAdAsync();
      this._log({ msg: "Rewarded ads Loaded\n", success: true });
      this.setState({ awardedBotton: false });
    } catch (error) {
      if (error.code == "E_AD_ALREADY_LOADED") {
        this.setState({ awardedBotton: false });
        this._log({
          msg: `Rewarded ads request failed (${error.code})\n`,
          warn: true
        });
      } else {
        this._log({
          msg: `Rewarded ads request failed (${error.code})\n`,
          error: true
        });
      }
    }

    try {
      this._log({ msg: "requesting Interstitial ads\n", info: true });
      await AdMobInterstitial.requestAdAsync();
      this._log({ msg: "Interstitial ads Loaded\n", success: true });
      this.setState({ interstitialBotton: false });
    } catch (error) {
      this._log({
        msg: `Interstitial ads request faild (${error.code})\n`,
        error: true
      });
    }

    //-----Register event handlers // optional
    AdMobInterstitial.addEventListener("interstitialDidLoad", () =>
      this._log({ msg: "interstitialDidLoad \n", success: true })
    );

    AdMobInterstitial.addEventListener("interstitialDidFailToLoad", () =>
      this._log({ msg: "interstitialDidFailToLoad \n", error: true })
    );

    AdMobInterstitial.addEventListener("interstitialDidOpen", () =>
      this._log({ msg: "interstitialDidOpen \n", info: true })
    );
    AdMobInterstitial.addEventListener("interstitialDidClose", () =>
      this._log({ msg: "interstitialDidClose \n", info: true })
    );
    AdMobInterstitial.addEventListener("interstitialWillLeaveApplication", () =>
      this._log({ msg: "interstitialWillLeaveApplication \n", info: true })
    );

    AdMobRewarded.addEventListener("rewardedVideoDidRewardUser", () =>
      this._log({ msg: "rewardedVideoDidRewardUser \n", info: true })
    );
    AdMobRewarded.addEventListener("rewardedVideoDidLoad", () =>
      this._log({ msg: "rewardedVideoDidLoad \n", success: true })
    );
    AdMobRewarded.addEventListener("rewardedVideoDidFailToLoad", () =>
      this._log({ msg: "rewardedVideoDidFailToLoad \n", error: true })
    );
    AdMobRewarded.addEventListener("rewardedVideoDidOpen", () =>
      this._log({ msg: "rewardedVideoDidOpen \n", info: true })
    );
    AdMobRewarded.addEventListener("rewardedVideoDidClose", () =>
      this._log({ msg: "rewardedVideoDidClose \n", info: true })
    );
    AdMobRewarded.addEventListener("rewardedVideoWillLeaveApplication", () =>
      this._log({ msg: "rewardedVideoWillLeaveApplication \n", info: true })
    );
  };

  //show interstitial ads
  showInterstitial = async () => {
    try {
      await AdMobInterstitial.showAdAsync();
    } catch (error) {
      this._log({ msg: error + "\n", error: true });
    }
  };

  //show reward ads
  showRewarded = async () => {
    try {
      await AdMobRewarded.showAdAsync();
    } catch (error) {
      this._log({ msg: error + "\n", error: true });
    }
  };

  bannerTwoEvent = e => {
    this._log({ msg: `Banner Two (${e}) \n`, info: true });
  };

  bannerOneEvent = e => {
    this._log({ msg: `Banner One (${e}) \n`, info: true });
  };

  _log = log => {
    this.state.logs.push(log);
    this.setState({
      logs: this.state.logs
    });
    this.scroll.scrollToEnd();
  };

  bannerOneError = e => {
    this._log({ msg: `Banner One (${e}) \n`, error: true });
    return;
  };

  bannerTwoError = e => {
    this._log({ msg: `Banner Two (${e}) \n`, error: true });
    return;
  };
  componentWillUnmount() {
    // remove all event listeners for interstitial/rewarded ads
    AdMobInterstitial.removeAllListeners();
    AdMobRewarded.removeAllListeners();
  }

  render() {
    let logArray = this.state.logs.map((log, i) => {
      return (
        <View
          key={i}
          style={{
            height: 20,
            borderBottomWidth: 1,
            borderBottomColor: "#ededed"
          }}
        >
          <Text
            style={[
              styles.logText,
              log.error
                ? { color: "red" }
                : log.warn
                ? { color: "#ffae42" }
                : log.success
                ? { color: "green" }
                : null
            ]}
          >
            {log.msg}
          </Text>
        </View>
      );
    });

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
          <ScrollView
            ref={scroll => {
              this.scroll = scroll;
            }}
          >
            {logArray}
          </ScrollView>
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
    height: 150
  },
  container: {
    flex: 1,
    backgroundColor: "#000"
  },
  logText: {
    color: "blue"
  }
});

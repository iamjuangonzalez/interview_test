import "../styles/bootstrap.min.css";
import "../styles/animate.min.css";
import "animate.css";
// Global Style
import "../styles/style.css";

import App from "next/app";
import Head from "next/head";

export default class MyApp extends App {
  // Preloader
  state = {
    loading: true,
  };
  componentDidMount() {
    this.timerHandle = setTimeout(
      () => this.setState({ loading: false }),
      2000
    );
  }
  componentWillUnmount() {
    if (this.timerHandle) {
      clearTimeout(this.timerHandle);
      this.timerHandle = 0;
    }
  }
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <title>Prueba - JuanGonzalez</title>
        </Head>

        <Component {...pageProps} />
      </>
    );
  }
}

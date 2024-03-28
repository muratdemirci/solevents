import React, { useState, useEffect } from "react";
// import { Connection, PublicKey } from "@solana/web3.js";

const Register = () => {
  const [account, setAccount] = useState("");

  useEffect(() => {
    loadBlockchainData();
  }, []);

  const loadBlockchainData = async () => {
    const connection = new Connection("https://api.mainnet-beta.solana.com");
    const version = await connection.getVersion();
    console.log("Connection to cluster established:", version["solana-core"]);
    const publicKey = new PublicKey("YourPublicKeyHere");
    setAccount(publicKey.toString());
  };

  return (
    <div
      style={{
        backgroundColor: "#282c34",
        color: "white",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1>Login with Solana</h1>
      <p>Your account: {account}</p>
    </div>
  );
};

export default Register;

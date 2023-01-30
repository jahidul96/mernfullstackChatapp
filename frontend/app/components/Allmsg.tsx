import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React, { FC, useContext } from "react";
import { AppColors } from "../utils/AppColors";
import Message from "./Message";
import { AuthContext } from "../context/AuthContext";

interface Props {
  loading: boolean;
  allMsg: any;
}
const Allmsg: FC<Props> = ({ loading, allMsg }) => {
  const { user } = useContext<any>(AuthContext);
  return (
    <>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={"small"} color={AppColors.WHITE} />
        </View>
      ) : (
        <View style={styles.msgContainer}>
          {allMsg?.length == 0 ? (
            <View style={styles.emptyTextContainer}>
              <Text style={styles.emptyText}>start conversations!</Text>
            </View>
          ) : (
            allMsg?.map((msg: any, index: any) => (
              <Message index={index} msg={msg} currentuser={user} key={index} />
            ))
          )}
        </View>
      )}
    </>
  );
};

export default Allmsg;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  msgContainer: {
    padding: 10,
  },
  emptyTextContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: AppColors.WHITE,
    fontSize: 20,
  },
});

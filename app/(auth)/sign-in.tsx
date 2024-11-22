import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { useSignIn } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
import { useCallback, useState } from "react";
import { View, Text, ScrollView, Image, Alert } from "react-native";

const SignIn = () => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onSignInPress = useCallback(async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      // console.error(JSON.stringify(err, null, 2));
      Alert.alert("Error", err.error[0].longMessage);
    }
  }, [isLoaded, form.email, form.password]);

  return (
    <ScrollView
      automaticallyAdjustKeyboardInsets={true}
      className="flex-1 bg-white"
    >
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[220px]">
          <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
          <Text className=" text-xl text-black font-JakartaSemiBold absolute bottom-0 left-5">
            Welcome
          </Text>
        </View>

        <View className="p-5">
          <InputField
            label="Email"
            placeholder="Enter your email"
            icon={icons.email}
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />
          <InputField
            label="Password"
            placeholder="Enter your password"
            icon={icons.lock}
            secureTextEntry={true}
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
          />

          <CustomButton
            title="Sign In"
            onPress={onSignInPress}
            className="mt-6"
          />

          <OAuth />

          <Link
            className="text-base text-center text-general-200 mt-10"
            href="/sign-up"
          >
            <Text>Don't have an account?</Text>
            <Text className="text-primary-500 font-JakartaBold">Sign up</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignIn;

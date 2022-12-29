import { Image, TouchableOpacity, View, SafeAreaView, Text } from "react-native";


const Login = () => {

   return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity
               style={{
                  backgroundColor: '#000',
                  width: 200,
                  height: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                  marginTop: 20
               }}
            >
               <Text style={{ color: '#fff', fontSize: 20 }}>Login</Text>
            </TouchableOpacity>
         </View>
      </SafeAreaView>
   );
}


export default Login;



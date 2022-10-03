import React, {Fragment, Component, useState} from 'react';
import {
  launchCamera,
  launchImageLibrary,
  showImagePicker,
} from 'react-native-image-picker';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  Button,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const options = {
  title: 'Select Avatar',
  customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
const Test = ({navigation}) => {
  const [filePath, setFilePath] = useState({
    data: '',
    uri: '',
  });

  const [fileData, setFileData] = useState('');
  const [fileUri, setFileUri] = useState('');

  const chooseImage = () => {
    let options = {
      title: 'Select Image',
      customButtons: [
        {name: 'customOptionKey', title: 'Choose Photo from Custom Option'},
      ],
      storageOptions: {
        skipBackup: false,
        path: 'images',
      },
    };
    /* ImagePicker. */ showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = {uri: response.uri};

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        // alert(JSON.stringify(response));s
        console.log('response', JSON.stringify(response));
        setFilePath(response);
        setFileData(response.data);
        setFileUri(response.uri);
      }
    });
  };

  const openCamera = () => {
    // console.log('Inside Launch Camera');
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
        // mediaType: 'photo',
      },
      //   includeBase64: true,
    };
    launchCamera(options, response => {
      //   console.log('Response = ', response);
      //   console.log('====================================');
      //   console.log(options);
      //   console.log('====================================');
      //   console.log(response);
      //   console.log('====================================');

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = {uri: response.assets[0].uri};
        console.log(source);
        // console.log('response', JSON.stringify(response));
        // alert('response', JSON.stringify(response));
        // setFilePath(response);
        // setFileData(response.data);

        // image from camera --> "file:///data/user/0/com.dealerzone/cache/rn_image_picker_lib_temp_9d171869-e3f0-47cc-b7ba-584b2481cef6.jpg"
        setFileUri(response.assets[0].uri);
      }
    });
  };

  const launchGallery = () => {
    // console.log('Inside launchImageLibrary');

    let options = {
      storageOptions: {
        // skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, response => {
      //   console.log('====================================');
      //   console.log(options);
      //   console.log('====================================');
      //   console.log(response);
      //   console.log('====================================');

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        // const source = {uri: response.uri};
        // console.log('response', JSON.stringify(response));
        // setFilePath(response);
        // setFileData(response.data);
        setFileUri(response.assets[0].uri);
      }
    });
  };

  // For images choosen from Gallery
  const renderFileData = () => {
    // console.log('Inside renderFileData');
    if (fileData) {
      return (
        <Image
          source={{uri: 'data:image/jpeg;base64,' + fileData}}
          style={styles.images}
        />
      );
    } else {
      return (
        <Image
          source={require('../assets/images/dummy.png')}
          style={styles.images}
        />
      );
    }
  };

  // For images captured from Camera
  const renderFileUri = () => {
    // console.log('Inside renderFileUri');
    if (fileUri) {
      return <Image source={{uri: fileUri}} style={styles.images} />;
    } else {
      return (
        <Image
          source={require('../assets/images/galeryImages.jpg')}
          style={styles.images}
        />
      );
    }
  };

  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.body}>
          <Text style={{textAlign: 'center', fontSize: 20, paddingBottom: 10}}>
            Pick Images from Camera and Gallery
          </Text>
          <View style={styles.ImageSections}>
            {/* <View>
              {renderFileUri()}
              <Text style={{textAlign: 'center'}}>Base 64 String</Text>
            </View> */}
            <View>
              {renderFileUri()}
              <Text style={{textAlign: 'center'}}>File Uri</Text>
            </View>
          </View>

          <View style={styles.btnParentSection}>
            {/* <TouchableOpacity
              onPress={this.chooseImage}
              style={styles.btnSection}>
              <Text style={styles.btnText}>Choose File</Text>
            </TouchableOpacity> */}

            <TouchableOpacity onPress={openCamera} style={styles.btnSection}>
              <Text style={styles.btnText}>Directly Launch Camera</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={launchGallery} style={styles.btnSection}>
              <Text style={styles.btnText}>Directly Launch Image Library</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Fragment>
  );
};

export default Test;

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },

  body: {
    backgroundColor: Colors.white,
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 1,
    height: Dimensions.get('screen').height - 20,
    width: Dimensions.get('screen').width,
  },
  ImageSections: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: 'center',
  },
  images: {
    width: 150,
    height: 150,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 3,
  },
  btnParentSection: {
    alignItems: 'center',
    marginTop: 10,
  },
  btnSection: {
    width: 225,
    height: 50,
    backgroundColor: '#DCDCDC',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    marginBottom: 10,
  },
  btnText: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

// export default class Test extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       filepath: {
//         data: '',
//         uri: '',
//       },
//       fileData: '',
//       fileUri: '',
//     };
//   }

//   chooseImage = () => {
//     let options = {
//       title: 'Select Image',
//       customButtons: [
//         {name: 'customOptionKey', title: 'Choose Photo from Custom Option'},
//       ],
//       storageOptions: {
//         skipBackup: false,
//         path: 'images',
//       },
//     };
//     /* ImagePicker. */ showImagePicker(options, response => {
//       console.log('Response = ', response);

//       if (response.didCancel) {
//         console.log('User cancelled image picker');
//       } else if (response.error) {
//         console.log('ImagePicker Error: ', response.error);
//       } else if (response.customButton) {
//         console.log('User tapped custom button: ', response.customButton);
//         alert(response.customButton);
//       } else {
//         const source = {uri: response.uri};

//         // You can also display the image using data:
//         // const source = { uri: 'data:image/jpeg;base64,' + response.data };
//         // alert(JSON.stringify(response));s
//         console.log('response', JSON.stringify(response));
//         this.setState({
//           filePath: response,
//           fileData: response.data,
//           fileUri: response.uri,
//         });
//       }
//     });
//   };

//   launchCamera = () => {
//     let options = {
//       storageOptions: {
//         skipBackup: false,
//         path: 'images',
//         // mediaType: 'photo',
//       },
//       //   includeBase64: true,
//     };
//     launchCamera(options, response => {
//       console.log('Response = ', response);

//       if (response.didCancel) {
//         console.log('User cancelled image picker');
//       } else if (response.error) {
//         console.log('ImagePicker Error: ', response.error);
//       } else if (response.customButton) {
//         console.log('User tapped custom button: ', response.customButton);
//         alert(response.customButton);
//       } else {
//         const source = {uri: response.uri};
//         // console.log('response', JSON.stringify(response));
//         alert('response', JSON.stringify(response));
//         this.setState({
//           filePath: response,
//           fileData: response.data,
//           fileUri: response.uri,
//         });
//       }
//     });
//   };

//   launchImageLibrary = () => {
//     let options = {
//       storageOptions: {
//         skipBackup: true,
//         path: 'images',
//       },
//     };
//     /*  ImagePicker. */ launchImageLibrary(options, response => {
//       console.log('Response = ', response);

//       if (response.didCancel) {
//         console.log('User cancelled image picker');
//       } else if (response.error) {
//         console.log('ImagePicker Error: ', response.error);
//       } else if (response.customButton) {
//         console.log('User tapped custom button: ', response.customButton);
//         alert(response.customButton);
//       } else {
//         const source = {uri: response.uri};
//         console.log('response', JSON.stringify(response));
//         this.setState({
//           filePath: response,
//           fileData: response.data,
//           fileUri: response.uri,
//         });
//       }
//     });
//   };

//   renderFileData() {
//     console.log('====================================');
//     console.log(this.state.fileData);
//     console.log('====================================');
//     if (this.state.fileData) {
//       return (
//         <Image
//           source={{uri: 'data:image/jpeg;base64,' + this.state.fileData}}
//           style={styles.images}
//         />
//       );
//     } else {
//       return (
//         <Image
//           source={require('../assets/images/dummy.png')}
//           style={styles.images}
//         />
//       );
//     }
//   }

//   renderFileUri() {
//     if (this.state.fileUri) {
//       return <Image source={{uri: this.state.fileUri}} style={styles.images} />;
//     } else {
//       return (
//         <Image
//           source={require('../assets/images/galeryImages.jpg')}
//           style={styles.images}
//         />
//       );
//     }
//   }
//   render() {
//     return (
//       <Fragment>
//         <StatusBar barStyle="dark-content" />
//         <SafeAreaView>
//           <View style={styles.body}>
//             <Text
//               style={{textAlign: 'center', fontSize: 20, paddingBottom: 10}}>
//               Pick Images from Camera & Gallery
//             </Text>
//             <View style={styles.ImageSections}>
//               <View>
//                 {this.renderFileData()}
//                 <Text style={{textAlign: 'center'}}>Base 64 String</Text>
//               </View>
//               <View>
//                 {this.renderFileUri()}
//                 <Text style={{textAlign: 'center'}}>File Uri</Text>
//               </View>
//             </View>

//             <View style={styles.btnParentSection}>
//               {/* <TouchableOpacity
//                 onPress={this.chooseImage}
//                 style={styles.btnSection}>
//                 <Text style={styles.btnText}>Choose File</Text>
//               </TouchableOpacity> */}

//               <TouchableOpacity
//                 onPress={this.launchCamera}
//                 style={styles.btnSection}>
//                 <Text style={styles.btnText}>Directly Launch Camera</Text>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 onPress={this.launchImageLibrary}
//                 style={styles.btnSection}>
//                 <Text style={styles.btnText}>
//                   Directly Launch Image Library
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </SafeAreaView>
//       </Fragment>
//     );
//   }
// }

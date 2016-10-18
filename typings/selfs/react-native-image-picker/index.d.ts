declare module 'react-native-image-picker' {

  interface options {
    // Specify null or empty string to remove the title
    title?: string;

    // Specify null or empty string to remove this button (Android only)
    cancelButtonTitle?: string;

    // Specify null or empty string to remove this button
    takePhotoButtonTitle?: string;

    // Specify null or empty string to remove this button
    chooseFromLibraryButtonTitle?: string;

    // An array containing objects with the name and title of buttons
    customButtons?: { name: string, title: string }[];

    // only support iOS
    cameraType?: 'front' | 'back';

    // 'photo', 'video', or 'mixed' on iOS, 'photo' or 'video' on Android
    mediaType?: 'photo' | 'video' | 'mixed';

    // Photos only
    maxWidth?: number;

    // Photos only
    maxHeight?: number;

    // 0 to 1, photos only
    quality?: number;

    // 'low', 'medium', or 'high' on iOS, 'low' or 'high' on Android
    videoQuality?: 'low' | 'medium' | 'high';

    // Max video recording time, in seconds
    durationLimit?: number;

    // Photos only, 0 to 360 degrees of rotation. only support Android
    rotation?: number;

    // enables built in iOS functionality to resize the image after selection
    // Only support iOS
    allowsEditing?: boolean;

    // If true, disables the base64 data field from being generated (greatly improves performance on large photos)
    noData?: boolean;

    // If this key is provided, the image will get saved in the Documents directory on iOS,
    // and the Pictures directory on Android (rather than a temporary directory)
    storageOptions?: {
      // If true, the photo will NOT be backed up to iCloud
      skipBackup?: boolean;

      // If set, will save image at /Documents/[path] rather than the root
      path?: string;

      // If true, the cropped photo will be saved to the iOS Camera roll.
      cameraRoll?: string
    }
  }

  interface response {
    // Informs you if the user cancelled the process
    didCancel: boolean;

    // Contains an error message, if there is one
    error: string;

    // The base64 encoded image data (photos only)
    data: string;

    // The uri to the local file asset on the device (photo or video)
    uri: string;

    // The URL of the original asset in photo library, if it exists
    // iOS only
    origURL: string;

    // Will be true if the image is vertically oriented
    isVertical: string;

    // Image dimensions
    width: number;

    // Image dimensions
    height: number;

    // The file size (photos only)
    fileSize: number;

    // The file type (photos only)
    // Android only
    type: string;

    // The file name (photos only)
    // Android only
    fileName: string;

    // The file path
    // Android only
    path: string;

    // Latitude metadata, if available
    // Android only
    latitude: string;

    // Longitude metadata, if available
    // Android only
    longitude: string;

    // Timestamp metadata, if available, in ISO8601 UTC format
    // Android only
    timestamp: string;
  }

  export var showImagePicker : (options: options, callback: (response: response) => any) => any;
}
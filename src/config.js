const config = {
	appTitle: "React-Firebase Todos",
	loadingMessage: "Loading data, please wait..",
	noDataMessage: "You are currently have no todo item, please add a new one :)",
	errorFirebaseMessage: "An error encountered while fetching the Firebase data, please reload the page :(",
	defaultData: [
		{ id: 0, value: "You can begin with inserting a new item", checked: false },	
		{ id: 1, value: "Or just delete this line :)", checked: true },
	],
	firebase: {
		apiKey: "AIzaSyDMwPEwZczMTTnZk32khspKQsFzhZa4Y0I",
		authDomain: "react-todos-7f61d.firebaseapp.com",
		databaseURL: "https://react-todos-7f61d.firebaseio.com",
		projectId: "react-todos-7f61d",
		storageBucket: "",
		messagingSenderId: "537322359882",
		appId: "1:537322359882:web:714c65b1ad0c75dec66ab3"
	}	
};

export default config;
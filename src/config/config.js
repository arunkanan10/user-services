let Config = function () {
	return {
        usersUrl : "https://jsonplaceholder.typicode.com/users", 
        postsUrl : "https://jsonplaceholder.typicode.com/posts"
	};
};

module.exports = new Config();

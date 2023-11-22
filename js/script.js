
const user = "trendingUpward83";
const profileInfo = document.querySelector(".overview") /*Div w/ profile info */
const repoList = document.querySelector(".repo-list"); /*Repo list */



const getGithubUserInfo = async function () {
    const res = await fetch(`https://api.github.com/users/${user}`);
    const data = await res.json();
    displayUserInfo(data);
    getRepoInfo(); 

};


const displayUserInfo = function (jsonData) {
    const newDiv = document.createElement("div");
    newDiv.classList.add("user-info");

    newDiv.innerHTML = `<p>Test</p>`;
    newDiv.innerHTML = `
    <figure>
      <img alt="user avatar" src=${jsonData.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${jsonData.name}</p>
      <p><strong>Bio:</strong> ${jsonData.bio}</p>
      <p><strong>Location:</strong> ${jsonData.location}</p>
      <p><strong>Number of public repos:</strong> ${jsonData.public_repos}</p>
    </div> `;
    profileInfo.append(newDiv);


};

const getRepoInfo = async function () {
    const res = await fetch(`https://api.github.com/users/${user}/repos?sort=updated&per_page=100`);
    const data = await res.json();
    console.log(data);
    displayRepoInfo(data); 
};

const displayRepoInfo = function(repos){
    for (let repo of repos){
        const newItem = document.createElement("li");
        newItem.classList.add("repo");
        newItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(newItem); 
        
    }
};

getGithubUserInfo();







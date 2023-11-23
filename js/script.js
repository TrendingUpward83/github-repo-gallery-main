
const user = "trendingUpward83";
const profileInfo = document.querySelector(".overview") /*Div w/ profile info */
const repoList = document.querySelector(".repo-list"); /*Repo list */
const allRepos = document.querySelector(".repos"); /*section of repos */
const repoData = document.querySelector(".repo-data"); /*individual repos*/



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


const repoListener = repoList.addEventListener("click", function(e){
    
    if (e.target.matches("h3")){
        const innerName = e.target.innerText;
        getSpecRepo(innerName); 
    }
});

const getSpecRepo = async function(repoName){
    const res = await fetch(`https://api.github.com/repos/${user}/${repoName}`);
    const repoInfo = await res.json();
    const lang = await fetch (`${repoInfo.languages_url}`);
    const languageData = await lang.json();
    const languages = [];
    for (let language in languageData){
        languages.push(language); 
    }
    dispRepoInfo(repoInfo,languages); 

};

const dispRepoInfo = function(repoInfo,languages){
    repoData.innerHTML="";
    const newDiv = document.createElement("div");
    newDiv.innerHTML =`<h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
    repoData.append(newDiv);
    allRepos.classList.add("hide");
    repoData.classList.remove("hide"); 
 
};






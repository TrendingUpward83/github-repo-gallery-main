
const user = "trendingUpward83";
const profileInfo = document.querySelector(".overview") /*Div w/ profile info */



const githubUserInfo = async function() {
    const res = await fetch(`https://api.github.com/users/${user}`);
    const data = await res.json();
    displayUserInfo(data);
    
};


const displayUserInfo = function (jsonData) {
    const newDiv = document.createElement("div");
    newDiv.classList.add("user-info");
    
    newDiv.innerHTML =`<p>Test</p>`;
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

githubUserInfo();






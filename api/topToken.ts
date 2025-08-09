export async function getTopToken() {
    const url =`https://backends.phaser.bot/api/v1/token-top/`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
       
      },
     
    });
    if (res.status < 400) {
      return await res.json();
    } else {
      return null;
    }
  }

  export async function getTrendingToken() {
    const url =`https://backends.phaser.bot/api/v1/trending/`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
       
      },
     
    });
    if (res.status < 400) {
      return await res.json();
    } else {
      return null;
    }
  }

  export async function getRecentToken() {
    const url =`https://backends.phaser.bot/api/v1/trending/`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
       
      },
     
    });
    if (res.status < 400) {
      return await res.json();
    } else {
      return null;
    }
  }


  export async function deployToken(payload:any) {
    const url =`https://backends.phaser.bot/api/v1/deploy-token/`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
       
      },
      body:JSON.stringify(payload)
     
    });
    console.log("ssssss")
    if (res.status < 400) {
      return await res.json();
    } else {
      return null;
    }
  }


   export async function getDetail(id:any) {
    console.log("lobdang", id)
    const url =`https://backends.phaser.bot/api/v1/token-detail/${id}`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
       
      },
     
    });
    if (res.status < 400) {
      return await res.json();
    } else {
      return null;
    }
  }
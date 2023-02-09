/*
This js file define the login popup, topbar appear, check frieghter install
*/

IS_DEBUG = false;
if (IS_DEBUG) {
    SEVER_URL = "https://horizon-testnet.stellar.org";
    NETWORK_PASSPHRASE = StellarSdk.Networks.TESTNET;
    NETWORK_TEXT = "TESTNET";
} else {
    SEVER_URL = "https://horizon.stellar.org";
    NETWORK_PASSPHRASE = StellarSdk.Networks.PUBLIC;
    NETWORK_TEXT = "PUBLIC";
}
STELLAR_SERVER = new StellarSdk.Server(SEVER_URL);

XLM = new StellarSdk.Asset.native();
yXLM = new StellarSdk.Asset("yXLM", "GARDNV3Q7YGT4AKSDF25LT32YSCCW4EV22Y2TV3I2PU2MMXJTEDL5T55");
USDC = new StellarSdk.Asset("USDC", "GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN");
AQUA = new StellarSdk.Asset("AQUA", "GBNZILSTVQZ4R7IKQDGHYGY2QXL5QOFJYQMXPKWRRM5PAV7Y4M67AQUA");


};

PAIR_NUMBER = 8;
UPDATE_TIME = 1000*60;  // one min
UPDATE_SWITCH = 1;

function clock() {
    let timeStamp = Number(10*UPDATE_TIME);
    let before = new Date().getTime();
    const clockInterval = setInterval(function() {
        var now = new Date().getTime();
        var distance = now - before;
        if(UPDATE_SWITCH === 1){
            test();
        }
        if (distance > timeStamp) {
            clearInterval(clockInterval);
            console.log(`clock time is up`);
            UPDATE_SWITCH = 1;
        } else if(distance >= (9*UPDATE_TIME)) {
            console.log(`last update 9 min`);
            document.getElementsByClassName('modify_tip_num')[0].innerHTML = '9 minutes ago';
        } else if(distance >= (8*UPDATE_TIME)) {
            console.log(`last update 8 min`);
            document.getElementsByClassName('modify_tip_num')[0].innerHTML = '8 minutes ago';
        } else if(distance >= (7*UPDATE_TIME)) {
            console.log(`last update 7 min`);
            document.getElementsByClassName('modify_tip_num')[0].innerHTML = '7 minutes ago';
        } else if(distance >= (6*UPDATE_TIME)) {
            console.log(`last update 6 min`);
            document.getElementsByClassName('modify_tip_num')[0].innerHTML = '6 minutes ago';
        } else if(distance >= (5*UPDATE_TIME)) {
            console.log(`last update 5 min`);
            document.getElementsByClassName('modify_tip_num')[0].innerHTML = '5 minutes ago';
        } else if(distance >= (4*UPDATE_TIME)) {
            console.log(`last update 4 min`);
            document.getElementsByClassName('modify_tip_num')[0].innerHTML = '4 minutes ago';
        } else if(distance >= (3*UPDATE_TIME)) {
            console.log(`last update 3 min`);
            document.getElementsByClassName('modify_tip_num')[0].innerHTML = '3 minutes ago';
        } else if(distance >= (2*UPDATE_TIME)) {
            console.log(`last update 2 min`);
            document.getElementsByClassName('modify_tip_num')[0].innerHTML = '2 minutes ago';
        } else if(distance >= (1*UPDATE_TIME)) {
            console.log(`last update 1 min`);
            document.getElementsByClassName('modify_tip_num')[0].innerHTML = '1 minute ago';
        } else if(distance >= (0)) {
            console.log(`last update 0 min`);
            document.getElementsByClassName('modify_tip_num')[0].innerHTML = 'just now';
            UPDATE_SWITCH = 0;
        }
    }, 1000);
    return clockInterval;
}

function popup_login() {
    login_toggle();
    document.querySelector("body").style.overflow = 'hidden';  //prevent page scrolling
}

function close_login() {
    login_toggle();
    document.querySelector("body").style.overflow = 'scroll';  //reset page scrolling
}

function login_toggle() {
    var blur = document.getElementById('blur');
    blur.classList.toggle('active');
    var popup_login = document.getElementById('signupModal');
    popup_login.classList.toggle('active');
}

function popup_public() {
    var popup_login = document.getElementById('signupModal');
    popup_login.classList.toggle('active');
    var popup_public = document.getElementById('signupModal_public');
    popup_public.classList.toggle('active');
    document.querySelector("body").style.overflow = 'hidden';  //prevent page scrolling
    document.getElementsByClassName('public_input_value')[0].value = "";
}

function close_public() {
    var blur = document.getElementById('blur');
    blur.classList.toggle('active');
    var popup_public = document.getElementById('signupModal_public');
    popup_public.classList.toggle('active');
    document.querySelector("body").style.overflow = 'scroll';  //reset page scrolling
}

function popup_burn(pair) {
    if(CURRENT_USER_ACCOUNT === ""){
        alert('Please login.');
        return 0;
    }
    document.getElementById('signupModal_burn').classList.add(pair);
    let imageNames = pair.split('_');
    // console.log(imageNames.length, imageNames);
    for(let i = 0; i < imageNames.length; i++)
    {   
        let tmpIdName = 'burn-pair-image-'+(i+1).toString();
        let tmpPairName = 'pair-ctn-desp-'+(i+1).toString();
        switch (imageNames[i])
        {
            case "XLM":
                document.getElementById(tmpIdName).src = "https://dynamic-assets.coinbase.com/ddaf9d27a2388105c5568c68ebe4078d057efac1cb9b091af6a57f4d187cf06b2701b95f75bd148d3872df32b69ebb678de71a42da317370aaec7d6448bda379/asset_icons/80782fe2d690f299e7f5bb9b89af87e1db75769e59c14fa0257054c962401805.png";
                document.getElementById(tmpPairName).innerHTML = "XLM";
                break;
            case "USDC":
                document.getElementById(tmpIdName).src = "https://www.centre.io/images/usdc/usdc-icon-86074d9d49.png";
                document.getElementById(tmpPairName).innerHTML = "USDC";
                break;
            case "yXLM":
                document.getElementById(tmpIdName).src="https://ultrastellar.com/static/images/icons/yXLM.png";
                document.getElementById(tmpPairName).innerHTML = "yXLM";
                break;
            case "AQUA":
                document.getElementById(tmpIdName).src="https://aqua.network/assets/img/aqua-logo.png";
                document.getElementById(tmpPairName).innerHTML = "AQUA";
                break;
        }  
    }
    var blur = document.getElementById('blur');
    blur.classList.toggle('active');
    var popup_bn = document.getElementById('signupModal_burn');
    popup_bn.classList.toggle('active');
    var userBalance = checkTrustline();
    if(userBalance >= 0){
        document.getElementsByClassName('title-tip-span')[0].classList.remove('active');
        document.getElementsByClassName('title-tip-span')[1].classList.add('active');
        document.getElementsByClassName('title-tip-span-text')[0].innerHTML = userBalance.toString();
    } 
}

function close_burn() {
    var blur = document.getElementById('blur');
    blur.classList.toggle('active');
    var popup_bn = document.getElementById('signupModal_burn');
    popup_bn.classList.toggle('active');
    document.getElementsByClassName('pair_input_value')[0].value = "1";
    document.getElementsByClassName('balance-num')[0].innerHTML = "1";
    document.getElementsByClassName('stellar_copy_link')[0].classList.remove('active');
    document.getElementsByClassName('title-tip-span')[0].classList.add('active');
    document.getElementsByClassName('title-tip-span')[1].classList.remove('active');
    document.getElementById('signupModal_burn').classList.remove(document.getElementById('signupModal_burn').classList.item(1));
    document.getElementsByClassName('burn-btn-main')[0].classList.add('disabled');
    document.getElementsByClassName('burn-submit-btn')[0].style.pointerEvents = 'none';
    document.getElementsByClassName('title-tip-span-text')[0].innerHTML = "NA";
    document.getElementsByClassName('burn-loader-ctn')[0].classList.remove('active');
    document.getElementsByClassName('burn-submit-btn')[0].innerHTML = "Submit";
}

function confirm_burn_num() {
    let tmp = Number(document.getElementsByClassName('pair_input_value')[0].value);
    if(tmp<1) {
        alert('Please input number greater than 1.');
    } else {
        document.getElementsByClassName('balance-num')[0].innerHTML = document.getElementsByClassName('pair_input_value')[0].value;
        document.getElementsByClassName('burn-btn-main')[0].classList.remove('disabled');
        document.getElementsByClassName('burn-submit-btn')[0].style.pointerEvents = 'auto';
    }
}

function toggle_login_arrow() {
    document.getElementsByClassName('menu-login-arrow')[0].classList.toggle('active');
}

function toggle_logout() {
    document.getElementsByClassName('menu-user')[0].classList.toggle('active');
    document.getElementById('login-arrow-down').classList.toggle('active');
    document.getElementById('login-arrow-up').classList.toggle('active');
}

function logout() {
    document.getElementsByClassName('login_button')[0].innerHTML = 'Connect Wallet';
    CURRENT_LOGIN_METHOD = 0;
    for (let i = 0; i < PAIR_NUMBER; i++) {
        document.getElementsByClassName('lock_num')[i].innerHTML = "NA";
        document.getElementsByClassName('lp_num')[i].innerHTML = "NA";
        document.getElementsByClassName('mvote_num')[i].innerHTML = "NA";
        document.getElementsByClassName('your_num')[i].innerHTML = "NA";
        document.getElementsByClassName('burn_num_1')[i].innerHTML = 0;
    }
    CURRENT_USER_ACCOUNT = "";
    CURRENT_LOGIN_METHOD = 0;
    UPDATE_SWITCH = 1;
    toggle_login_arrow();
    toggle_logout();
    check_login();
}

function check_login() {
    if(CURRENT_LOGIN_METHOD !== 0){
        console.log(`login success`);
        document.getElementsByClassName('menu-login-btn')[0].style.pointerEvents = 'none';
        clockIntervalId = clock(); // first start
        mvoteIntervalId = setInterval(()=> {clockIntervalId = clock()}, 10*UPDATE_TIME);
    }
    else {
        console.log(`login fail`);
        document.getElementsByClassName('menu-login-btn')[0].style.pointerEvents = 'auto';
        clearInterval(mvoteIntervalId);
        clearInterval(clockIntervalId);
    }
}

async function publickey_login() {
    close_public();
    var userPublicKey = document.getElementsByClassName('public_input_value')[0].value;
    await STELLAR_SERVER.loadAccount(userPublicKey)
        .then((Account) => {
            console.log(Account.accountId());
            CURRENT_USER_ACCOUNT = Account;
            document.getElementsByClassName('login_button')[0].innerHTML = Account.accountId().slice(0, 4) + '...' + Account.accountId().slice(-4);
            document.getElementsByClassName('menu-login-btn')[0].setAttribute("pointer-events", "none");
            toggle_login_arrow();
            CURRENT_LOGIN_METHOD = 2;
        })
        .catch((e) => {
            console.log(`This account is INVALID!`);
            alert(`This account is INVALID!`);
            console.error(e);
        });

    check_login();
}

async function freight_login() {
    close_login();

    if (window.freighterApi.isConnected()) {
        try {
            var userPublicKey = await window.freighterApi.getPublicKey();
            var userNetwork = await window.freighterApi.getNetwork();
        } catch (e) {
            console.log(`Error ${e} in retrievePublicKey() or retrieveNetwork().`);
            return 0;
        }
        console.log(`User is using Freighter with publickey: ${userPublicKey} and network: ${userNetwork}`);

        if (userNetwork !== NETWORK_TEXT) {
            alert(`Please switch to ${NETWORK_TEXT} Network in Freighter and try again!`);
        } else {
            await STELLAR_SERVER.loadAccount(userPublicKey)
                .then((Account) => {
                    console.log(Account.accountId());
                    CURRENT_USER_ACCOUNT = Account;
                    document.getElementsByClassName('login_button')[0].innerHTML = Account.accountId().slice(0, 4) + '...' + Account.accountId().slice(-4);
                    document.getElementsByClassName('menu-login-btn')[0].setAttribute("pointer-events", "none");
                    toggle_login_arrow();
                    CURRENT_LOGIN_METHOD = 1;
                })
                .catch((e) => {
                    console.log(`This account is INVALID!`);
                    console.error(e);
                });
        }
    } else {
        alert(`Please download the Freighter extension first!`);
    }
    check_login();
}

async function getAquaVote(pairIndex, voteAsset=AQUA, server=STELLAR_SERVER, userAccount=CURRENT_USER_ACCOUNT) {
    if (userAccount === "") {
        return 0;
    }

    var voteKeypair = PAIRS_LIST[pairIndex]['VOTE'];

    var cursor = "";
    var records = [];

    while (true) {
        try {
            var response = await server
                .claimableBalances()
                .claimant(voteKeypair.publicKey())
                .asset(voteAsset)
                .cursor(cursor)
                .limit(200)
                .call();
        } catch (e) {
            console.log(`Error ${e} in getAquaVote().`);
            return 0;
        }

        var recordList = response['records'];

        if (recordList.length > 0) {
            records.push.apply(records, recordList);
            var nextCursor = recordList[recordList.length - 1]['paging_token'];
            if (cursor !== nextCursor) {
                cursor = nextCursor;
                // console.log(`Get cursor: ${cursor}.`);
            } else {
                // console.log(`All votes are retrieved.`);
                break;
            }
        } else {
            // console.log(`All votes are retrieved.`);
            break;
        }
    }

    var userAmount = 0;
    var totalAmount = 0;
    for (var recordIndex in records) {
        var voteAmount = parseFloat(records[recordIndex]['amount']);
        var claimantAccount = records[recordIndex]['claimants'][1]['destination'];
        if (claimantAccount === userAccount.accountId()) {
            userAmount = userAmount + voteAmount;
        }
        totalAmount = totalAmount + voteAmount;
    }
    console.log(`${records.length} votes in total, ${userAmount}/${totalAmount}`);
    document.getElementsByClassName('lock_num')[pairIndex].innerHTML = (userAmount * 100/ totalAmount).toFixed(4) + '%';
    return {'userAmount': userAmount, 'totalAmount': totalAmount};
}

async function getLPShare(pairIndex, server=STELLAR_SERVER, userAccount=CURRENT_USER_ACCOUNT) {
    if (userAccount === "") {
        return 0;
    }

    var LPAsset = PAIRS_LIST[pairIndex]['POOL'];

    var totalAmount = 0;
    var userAmount = 0;

    var poolId = LPAsset.toString().split('liquidity_pool:')[1];

    try {
        var response = await server
            .liquidityPools()
            .liquidityPoolId(poolId)
            .call();
    } catch (e) {
        console.log(`Error ${e} in getLPShare().`);
        return 0;
    }

    totalAmount = parseFloat(response['total_shares']);

    var userBalances = userAccount['balances'];
    for (var bIndex in userBalances) {
        if (userBalances[bIndex]['asset_type'] === "liquidity_pool_shares") {
            if (userBalances[bIndex]['liquidity_pool_id'] === poolId) {
                userAmount = parseFloat(userBalances[bIndex]['balance']);
                break;
            }
        }
    }
    console.log(`${userAmount}/${totalAmount}`);
    document.getElementsByClassName('lp_num')[pairIndex].innerHTML = (userAmount * 100/ totalAmount).toFixed(4) + '%';
    return {'userAmount': userAmount, 'totalAmount': totalAmount};
}

    console.log(`${records.length} burns in total, ${userAmount}/${totalAmount}`);
    let tmpMvoteNum = (userAmount * 100/ totalAmount).toFixed(4);
    if (isNaN(tmpMvoteNum)) {
        tmpMvoteNum = (0).toString();
    } else {
        tmpMvoteNum = (tmpMvoteNum).toString();
    }
    if (userAccount !== "") {
        document.getElementsByClassName('mvote_num')[pairIndex].innerHTML = tmpMvoteNum + '%';
    }
    document.getElementsByClassName('burn_num_1')[pairIndex].innerHTML = userAmount.toFixed(0);
    document.getElementsByClassName('burn_num_2')[pairIndex].innerHTML = totalAmount.toFixed(0);   
    return {'userAmount': userAmount, 'totalAmount': totalAmount};
}

function calReward(pairIndex, voteAmount, lpAmount, burnAmount) {
    let averageReward, finalReward;
    averageReward = (voteAmount*1 + lpAmount*2 + burnAmount*1) / 4;
    finalReward = Math.min(voteAmount, averageReward);
    document.getElementsByClassName('your_num')[pairIndex].innerHTML = (finalReward*100).toFixed(4) + '%';
}

function calPairReward(pairIndex, totalBurn, totalVote) {
    var sumBurn = 0;
    for (let i = 0; i < totalBurn.length; i++) {
        sumBurn += totalBurn[i];
    }
    var pairReward = totalBurn[pairIndex] / sumBurn * 0.7;
    
    document.getElementsByClassName('reward_num')[pairIndex].innerHTML = (pairReward*100).toFixed(4) + '%';
}

    }

    var burnAccount = PAIRS_LIST[pairIndex]['BURN'];

    var tx = new StellarSdk.TransactionBuilder(
        userAccount, {
            fee: '10000',
            networkPassphrase: NETWORK_PASSPHRASE
        }
    )
        .addOperation(
            StellarSdk.Operation.payment({
                destination: burnAccount.publicKey(),
                asset: burnAsset,
                amount: burnAmount.toString()
            })
        )
        .setTimeout(600)
        .build();
    var txXDR = tx.toXDR();
    console.log(`Transaction XDR: ${txXDR}`);
    return txXDR;
}

async function submitTx() {
    var pairName = document.getElementById('signupModal_burn').classList.item(1);
    let pairIndex = NAME_INDEX_DICT[pairName];

    let burnAmount = document.getElementsByClassName('pair_input_value')[0].value;
    if (burnAmount <= 0) {
        alert('Please input value of burn');
        return 0;
    }
    let txXDR = generateTxXDR(pairIndex, burnAmount);

    if (CURRENT_LOGIN_METHOD === 1) {
        document.getElementsByClassName('burn-loader-ctn')[0].classList.add('active');
        document.getElementsByClassName('burn-submit-btn')[0].innerHTML = "";
        try {
            var signedTx = await window.freighterApi.signTransaction(txXDR, NETWORK_TEXT);
        } catch (e) {
            console.log(`Error ${e} in freighter signTransaction().`);
            alert(`Fail to sign the transaction.`);
            close_burn();
            return 0;
        }
        try{
            var txToSubmit = StellarSdk.TransactionBuilder.fromXDR(signedTx, SEVER_URL);
        } catch (e) {
            console.log(`Error ${e} in freighter buildTransaction().`);
            alert(`Fail to build the transaction.`);
            close_burn();
            return 0;
        }
        try{
            var response = await STELLAR_SERVER.submitTransaction(txToSubmit);
            console.log(`Transaction submitted with response ${response}.`);
            alert(`Successfully send the transaction.`);
            close_burn();
            return 0;
        } catch (e) {
            console.log(`Error ${e} in freighter submitTransaction().`);
            alert(`Fail to submit the transaction.`);
            close_burn();
            return 0;
        }
    } else if (CURRENT_LOGIN_METHOD === 2) {
        document.getElementsByClassName('burn-loader-ctn')[0].classList.add('active');
        document.getElementsByClassName('burn-submit-btn')[0].innerHTML = "";
        document.getElementsByClassName('stellar_copy_link')[0].classList.add('active');
        document.getElementsByClassName('link-ctn-text')[0].innerHTML = `${txXDR}`;
        document.getElementsByClassName('link-ctn-url')[0].href= "https://laboratory.stellar.org/#txsigner?network=public";
        document.getElementsByClassName('burn-submit-btn')[0].style.pointerEvents = 'none';
    }
}

    var assetBalance = -1;

    var userBalances = userAccount['balances'];
    for (var bIndex in userBalances) {
        if (userBalances[bIndex]['asset_type'] !== "liquidity_pool_shares" &&
            userBalances[bIndex]['asset_type'] !== "native" &&
            userBalances[bIndex]['asset_code'] === targetAsset.getCode() &&
            userBalances[bIndex]['asset_issuer'] === targetAsset.getIssuer()) {
                assetBalance = parseFloat(userBalances[bIndex]['balance']);
                break;
        }
    }

    if (assetBalance >= 0) {
        console.log(`You have ${targetAsset.getCode()} trustline with ${assetBalance} balance.`);
    } else {
        console.log(`You don't have ${targetAsset.getCode()} trustline.`);
    }

    return assetBalance;
}

async function getAquaTotalVote(pairIndex, voteAsset=AQUA, server=STELLAR_SERVER) {
    
    var voteKeypair = PAIRS_LIST[pairIndex]['VOTE'];

    var cursor = "";
    var records = [];


    for (let i = 0; i < PAIR_NUMBER; i++) {
        calReward(i, voteAmount[i], lpAmount[i], burnAmount[i]);
        calPairReward(i, totalBurn, totalVote);
        document.getElementsByClassName('pair_vote_num')[i].innerHTML = totalVote[i].toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');;
    }

}

AM.queueDownload("./img/background/background_1.png");
AM.queueDownload("./img/background/background_2.png");
AM.queueDownload("./img/background/background_3.png");
AM.queueDownload("./img/terrain/dirt.jpg");
AM.queueDownload("./img/terrain/red_dirt.jpg");
AM.queueDownload("./img/terrain/purple_dirt.jpg");
AM.queueDownload("./img/explosion/banLeft.png");
AM.queueDownload("./img/explosion/banRight.png");
AM.queueDownload("./img/explosion/banIdle.png");
AM.queueDownload("./img/rocket/projectile1.png");
AM.queueDownload("./img/explosion/explosion.png");
AM.queueDownload("./img/Lime/limeIdle.png");
AM.queueDownload("./img/Lime/limeLeft.png");
AM.queueDownload("./img/Lime/limeRight.png");
AM.queueDownload("./img/Pineapple/pineappleIdle.png");
AM.queueDownload("./img/Pineapple/pineappleLeft.png");
AM.queueDownload("./img/Pineapple/pineappleRight.png");
AM.queueDownload("./img/Coconut/coconutIdle.png");
AM.queueDownload("./img/Coconut/coconutLeft.png");
AM.queueDownload("./img/Coconut/coconutRight.png");
AM.queueDownload("./img/rocket/reticle.png");
AM.queueDownload("./img/hud/hud.png");
AM.queueDownload("./img/weapon/grenadeLauncher.png");
AM.queueDownload("./img/weapon/sniper.png");
AM.queueDownload("./img/weapon/grenadeLauncherB.png");
AM.queueDownload("./img/weapon/sniperB.png");
AM.queueDownload("./img/weapon/airStrike.png");
AM.queueDownload("./img/weapon/gravityGun.png");
AM.queueDownload("./img/rocket/sniperBullet.png");
AM.queueDownload("./img/rocket/airRocket.png");
AM.queueDownload("./img/weapon/teleporter.png");



var team1 = [];
var team2 = [];
this.playersSelected = false; // checks to see if both teams are completed
this.teamOneSelected = true; // True if player 1 is selected, False if player selecting

function playerSelected(theId) {

    // logic on click disable the view for that box
    document.getElementById(theId).style.display = "none";

    // Add to team 1 
    if (teamOneSelected) {
        team1.push(theId);
        if (team1.length >= 2) {
            teamOneSelected = false;
            document.getElementById("team1Text").style.display = "none";
            document.getElementById("team2Text").style.display = "block";
        }
    } else {
        team2.push(theId);
        if (team2.length >= 2) {
            document.getElementById("mainManu").style.display = "none";
            document.getElementById("gameMenu").style.display = "block";

            AM.downloadAll(function () {
                var canvas = document.getElementById("gameWorld");
                var ctx = canvas.getContext("2d");
                var gameEngine = new GameEngine();
                gameEngine.init(ctx);
                gameEngine.start();
                gameEngine.addEntity(new turnManager(gameEngine, ctx, team1, team2));

            });
        }
    }
}

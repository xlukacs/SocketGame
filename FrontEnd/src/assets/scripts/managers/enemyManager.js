var enemies = [];
var highlightedEnemy = "";

import { baseEnemy } from "../enemies/baseEnemy.js";

export async function spawnEnemies(scene) {
  for (let i = 0; i < 2; i++) {
    enemies.push(new baseEnemy(scene, "enemy" + i));
  }
}

export async function updateEnemies(scene) {
  for (let i = 0; i < enemies.length; i++) {
    const enemy = enemies[i];
    enemy.update(scene);
  }
}

export function highlightEnemy(enemyName) {
  for (let i = 0; i < enemies.length; i++) {
    const enemy = enemies[i];
    enemy.clearHighlight();

    highlightedEnemy = enemyName;

    // console.log(enemy.name, enemyName);
    if (enemy.name == enemyName) enemy.highlight();
  }
}

export function attackEnemy(playerName) {
  for (let i = 0; i < enemies.length; i++) {
    const enemy = enemies[i];
    if (enemy.name == highlightedEnemy) enemy.setAttacker(playerName);
  }
}

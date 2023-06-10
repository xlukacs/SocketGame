var enemies = [];

import { baseEnemy } from "../enemies/baseEnemy.js";

export async function spawnEnemies(scene) {
  for (let i = 0; i < 5; i++) {
    enemies.push(new baseEnemy(scene, "enemy" + i));
  }
}

export async function updateEnemies(scene) {
  for (let i = 0; i < enemies.length; i++) {
    const enemy = enemies[i];
    enemy.update(scene);
  }
}

export function highlightEnemy(scene, enemyName) {
  for (let i = 0; i < enemies.length; i++) {
    const enemy = enemies[i];
    enemy.clearHighlight(scene);
    // console.log(enemy.name, enemyName);
    if (enemy.name == enemyName) enemy.highlight(scene);
  }
}

/**
 * Created by Larken on 6/22/2017.
 */
import ROT from 'rot-js'
import { StatelessAI } from '#/entities/actors/enemies/StatelessAI.js'
import { getRandomInt } from '#/utils/HelperFunctions.js'
import { getItemsFromDropTable } from '#/utils/EntityFactory.js'
import { materialTypes } from '#/utils/Constants.js'
import { createSword, Sword } from '#/entities/items/weapons/Sword.js'
import HealthPotion from '#/entities/items/potions/HealthPotion.js'
import StrengthPotion from '#/entities/items/potions/StrengthPotion.js'
import ManaPotion from '#/entities/items/potions/ManaPotion.js'
import { Game } from '#/Game.js'
import { SteelArrow } from '#/entities/items/weapons/ranged/ammo/Arrow.js'

export default class Goblin extends StatelessAI {
	constructor(x, y, id) {
		let randomHP = getRandomInt(6, 9)
		let randomStr = getRandomInt(1, 3)
		super(
			x,
			y,
			{
				id: id,
				name: 'goblin',
				description: 'A mean, green goblin!',
				visible: true,
				blocked: true,
				chasing: false,
				combat: {
					/* options.combat, dedicated to all things related to combat */
					description: [' attacked '],
					/* max stats */
					maxhp: randomHP,
					maxmana: 5,
					/* current stats */
					hp: randomHP,
					mana: 5,
					str: randomStr,
					def: 1,
					/* misc */
					hostile: true,
					range: 9,
					invulnerable: false
				}
			},
			{
				/* AI parameters */
				morale: 0.2,
				minPlayerDist: 0,
				maxPlayerDist: 0,
				ranged: false,
				melee: true,
				magic: false,
				wanders: true
			}
		)

		if (getRandomInt(1, 10) <= 2) {
			let items = getItemsFromDropTable({
				minItems: 1,
				maxItems: 1,
				dropTable: {
					GOLD: { chance: 5, options: { quantity: getRandomInt(1, 10) } },
					STRENGTH_POTION: { chance: 1 },
					HEALTH_POTION: { chance: 5 },
					MANA_POTION: { chance: 5 },
					SWORD: { chance: 3, options: { materialType: materialTypes.IRON } },
					SWORD: { chance: 1, options: { materialType: materialTypes.STEEL } }
				},
				x: this.x,
				y: this.y
			})
			items.forEach(item => this.addToInventory(item))
		}
	}
}

<template>
	<v-container fluid class="pl-1">
		<!-- Level -->
		<v-layout justify-space-between align-center>
			<div>
				<b>Level</b>
			</div>
			<div>
				{{getLevel()}}
			</div>
			<div>
				<v-btn class="extra-small" flat icon color="green">
					<v-icon small>add</v-icon>
				</v-btn>
			</div>
		</v-layout>
		<!-- Strength -->
		<v-layout>
			<v-flex md6>
				<b>Strength</b>
			</v-flex>
			<v-flex md3>{{getStrength()}}</v-flex>
		</v-layout>
		<!-- Defence -->
		<v-layout row>
			<v-flex md6>
				<b>Defence</b>
			</v-flex>
			<v-flex md3>{{getDefence()}}</v-flex>
		</v-layout>
		<!-- Damage -->
		<v-layout>
			<v-flex md6>
				<b>Damage</b>
			</v-flex>
			<v-flex md6>{{getDamageRange()}}</v-flex>
			<v-flex v-if="getCurrentWeapon() !== null && getCurrentWeaponEnchantments() !== null" md6 col>
				<b>Weapon Enchantments:</b> {{getCurrentWeaponEnchantments()}}
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
import { Game } from '@/assets/js/game/Game.js'
import { xp_levels } from '#/entities/Entity.js'

export default {
	data() {
		return {}
	},
	methods: {
		getHP() {
			return Game.player.cb.hp
		},
		getMaxHP() {
			return Game.player.cb.maxhp
		},
		getMana() {
			return Game.player.cb.mana
		},
		getMaxMana() {
			return Game.player.cb.maxmana
		},
		getStrength() {
			return Game.player.cb.str
		},
		getDefence() {
			return Game.player.cb.def + Game.player.getDefenceRating()
		},
		getDamageRange() {
			if (Game.player.getMinDmg() === Game.player.getMaxDmg()) return Game.player.getMinDmg()

			return Game.player.getMinDmg() + ' - ' + Game.player.getMaxDmg()
		},
		getLevel() {
			return Game.player.cb.level
		},
		getRemainingXP() {
			return Game.player.remainingXP()
		},
		getPercentToLevel() {
			let costOfLevel = xp_levels[this.getLevel()] - xp_levels[this.getLevel() - 1]
			let expTowards = Game.player.cb.xp - xp_levels[this.getLevel() - 1]
			return expTowards / costOfLevel
		},
		getAttributePoints() {
			return Game.player.cb.attributePoints
		},
		getCurrentWeapon() {
			return Game.player.cb.equipment.weapon
		},
		getCurrentWeaponEnchantments() {
			if (this.getCurrentWeapon() !== null) {
				let enchantments = this.getCurrentWeapon().cb.enchantments
				if (enchantments.length === 0) return null
				else if (enchantments.length === 1) return enchantments[0].name
				else
					return enchantments.reduce((str, enchantment) => {
						return str + ', ' + enchantment.name
					}, '')
			} else {
				return null
			}
		},
		getCurrentSpell() {
			return Game.player.cb.currentSpell
		}
	}
}
</script>
<style>
.extra-small {
	width: 24px;
	height: 24px;
}
</style>


<script>

    let charName = '';
    let level = 1;
    let selectedOrigin = 'brotherhood-initiate';

    const originData = {
        'brotherhood-initiate': {
			'description': 'The Brotherhood of Steel’s primary goals are the recovery and preservation of old-world tech to keep it from the wrong hands. Different chapters have different ideas on how to accomplish these goals.\n\nYou are an initiate, learning the ways of your chapter and of the wasteland.',
			'trait': {
				'name': 'The Chain that Binds',
				'description': 'You gain an additional Tag skill (must be Energy Weapons, Science, or Repair). You must carry out the orders of your immediate supervisors and are responsible for your subordinates.\n\nFailure to comply will result in expulsion and reclamation of gear.'
			}
		},
        'ghoul': {
			'description': 'Exposure to background radiation has mutated you into a rotting, living corpse. You no longer age, and are healed by radiation. You may be pre-war, or recently converted.\n\nYou’re civilized, meaning you haven’t turned feral (yet).',
			'trait': {
				'name': 'Necrotic Post-Human',
				'description': 'You’re healed by Radiation damage (1HP/3Rad, reroll heal check when resting in irradiated locations). Survival becomes a Tag skill. You’re sterile, and will face discrimination from smoothskins.'
			}
		},
        'super-mutant': {
			'description': 'You’ve been forced to mutate via exposure to the Forced Evolutionary Virus (FEV). Mutation typically results in significantly increased strength and endurance, and significantly decreased charisma and intelligence.\n\nMost Super Mutants are openly hostile towards all others, so don’t expect warm welcomes.',
			'trait': {
				'name': 'Forced Evolution',
				'description': 'Your Strength and Endurance base and maximum are increased by +2. Your Intelligence and Charisma are capped at 6. You cannot have more than 4 ranks in any skill. You’re immune to Poison and Radiation. You’re sterile, and will face discrimination from non-Super Mutants.'
			}
		},
        'mister-handy': {
			'description': 'You’re a three-armed, three-eyed, domestic robot with a thruster, typically programmed to be a butler. Your code enables self-determination.',
			'trait': {
				'name': 'Mister Handy Robot',
				'description': 'You have 360° vision and chemical sensors, reducing difficulty of perception tests that use sight or smell by 1. You’re immune to Poison and Radiation. You cannot use chems or benefit from food, drink, or rest. You’re unaffected by difficult terrain or obstacles. Your carry weight is 150lbs, and can only be increased with armor mods. You can only heal via repairs. You cannot Lockpick, Repair, Throw, make unarmed attacks, or manipulate objects without a Pincer arm attachment. Weapon arm attachments come with 20 rounds of ammunition for the weapon.'
			}
		},
        'survivor': {
			'description': 'You and others like you have survived the apocalypse, and not under the rule of any organization.',
			'trait': {
				'name': 'Versitile',
				'description': 'Choose 2, or 1 and a perk:',
                'traits': {
                    'Educated': 'You have +1 tag skill, but failing a non-tagged skill gives GM 1 AP.',
                    'Fast Shot': 'If you take a second major action to make a ranged attack, it only costs 1 AP. You cannot Aim',
                    'Gifted': 'Increase 2 SPECIAL by 1 each. Your maximum Luck points is LCK minus 1.',
                    'Heavy Handed': 'Melee damage is +1CD. Melee and Un-armed suffer complications at 19+.',
                    'Small Frame': 'You may reroll 1d20 on AGI that rely on balance/coordination. Carry weight is 150+(5*STR)lbs.',
                    'Feat': 'Take an extra feat when selecting feats.'
                }
			}
		},
        'vault-dweller': {
			'description': 'Your predecessors survived the bombs by tucking away into underground vaults. You’ve been physically sheltered, but the experiments of the vault have left you psychologically impacted.\n\nIf ghoul, take ghoul trait instead.',
			'trait': {
				'name': 'Vault Kid',
				'description': 'Difficulty of Endurance checks to resist disease are minus 1. You get +1 Tag skill. Work with GM to determine a psychological compli-cation. Overcoming this complica-tion restores one LCK.',
                'canGhoul': true
			}
		},
        'minuteman': {
			'description': 'You’re a survivor who joined a group dedicated to protecting settlements at a minute’s notice. You’re one of the last, after the Quincy Massacre.',
			'trait': {
				'name': 'United We Stand',
				'description': 'You gain Energy Weapons or Small Guns as a Tag skill. Your DR is +1 in cover, and you gain +1CD while outnumbered. Your settlements gain traders every 5 days and have a base Defense resource of 4.'
			}
		},
        'ncr': {
			'description': 'You’re a citizen of one of the first nations to emerge from the war. Your upbringing in relative civilization grants you a unique perspective.',
			'trait': {
				'name': 'Raised in the West',
				'description': 'Choose 2, or 1 and a perk:',
                'traits': {
                    'Good Natured': 'Tag 2 of: Speech, Medicine, Repair, Science, Barter. Maximum of all skills not listed is 4.',
                    'Grunt': '+1CD with SMGs, combat/assault rifles, frag grenades, and combat knives. Complication range of big guns or energy weapons is +2.',
                    'Home on the Range': 'Resting by campfire 6+ hours decreases difficulty to recover from injuries by 1. You cannot gain Well Rested bonus.',
                    'Trigger Discipline': 'Reroll 1d20 on small guns or energy weapons checks. Reduce their fire rate by 1.',
                    'Brahmin Baron': 'Brahmin feed troughs provide upkeep for 3 brahmin. Tend Crops adds +1CD brahmin milk per feed trough.'
                },
                'alternates': ['survivor'],
                'canGhoul': true
			}
		},
        'protectron': {
			'description': 'You’re a cheap, bipedal work drone. You speak in a harsh, robotic monotone, and your initial programming does not allow for self-determination, though bugs and workarounds exist.',
			'trait': {
				'name': 'Protect or Destroy',
				'description': 'Once per scene, reroll to overcome an environmental hazard. You’re immune to Poison and Radiation. You cannot benefit from chems/food/drink/rest. You can only heal via repairs. You can only have two robot mods installed at once. When making tests related to your model’s purpose, first d20 costs 0AP. Your carry weight is 225lbs and can only be increased with armor mods'
			}
		},
        'robobrain': {
			'description': 'You’re the result of pre-war experiments to create highly-capable, obedient Soldiers. Your central processor is a human brain, wiped of its previous memories, and intended to be devoid of personality and emotion. You move on tracks, with two clawed arms and a built-in mesmetron.',
			'trait': {
				'name': 'Robobrain Robot',
				'description': 'Your visual sensors can detect infrared, ignoring darkness for Perception tests. You’re immune to Poison and Radiation. You can use your mesmetron to make ranged attacks. You cannot benefit from chems/food/drink/rest. You can only heal via repairs. Your carry weight is 150lbs and can only be increased with armor mods.'
			}
		},
        'securitron': {
			'description': 'You’re a private security robot designed by Robert House to protect New Vegas. You may have a custom personality, usually based on pre-war pop-culture references. You travel on a single wheel, and start with the Mk I operating system.',
			'trait': {
				'name': 'Mk I Securitron',
				'description': 'You’re immune to Poison and Radiation. You cannot benefit from chems/food/drink/rest. You can only heal via repairs. You move on a single tire; difficulty on tests to remain upright or balance is increased by 1. You have opposable claws on your arms and rudimentary weapons. Your shoulder-mounted missile launchers and grenade launcher are locked behind the MkII OS. Your carry weight is 150lbs and can only be increased with armor mods.'
			}
		},
        'synth': {
			'description': 'You’re a synthetic humanoid, nearly indistinguishable from humans aside from a chip that contains your programming. You were created by the Institute for unknown reasons, and may not know you are a synth.',
			'trait': {
				'name': 'More than Human',
				'description': 'You gain +1 Tag skill. You do not suffer starvation or dehydration. You do not need sleep, and can perform minor activities during rest. You are immune to Poison, Radiation, and disease. You do not age.\n\nYou have a recall code.\n\nThe difficulty of CHA tests made by you or allies against those that know you’re a synth and are usympathetic is +2. Complications either start combat or decrease settlement reputation by 1.'
			}
		},
        'child-of-atom': {
			'description': 'You worship radiation as a member of the Church of Atom. Your deliberate exposure leads to unique abilities.',
			'trait': {
				'name': 'Rad Sponge',
				'description': 'Your base Rad resistance is 1. Once per scene, you can take Radiation in someone Close’s stead. When taking Radiation (min 0), gain 1 Radiation Point (RP) (max 5). Spend RP to deal +2CD Radiation. Lose 1 RP when sleeping.'
			}
		},
        'assaultron': {
			'description': 'You’re designed for war. Fast, durable, and equipped with a powerful, deadly head-mounted laser. Humanoid, but more agile than a Protectron.',
			'trait': {
				'name': 'Designed for the Frontline',
				'description': 'Your limbs give you a +1CD to unarmed attacks in addition to STR bonuses. You can attack with claws or the built-in head laser. You can overload your core and self-destruct (this is not repairable). You’re immune to Poison and Radiation. You cannot benefit from chems/food/drink/rest. You can only heal via repairs. Your carry weight is 150lbs and can only be increased with armor mods.'
			}
		},
        'brotherhood-outcast': {
			'description': 'You’ve rejected the BoS for reasons that only you truly know. You agree with the mission (or parts of it), but dislike the execution. In some ways, you’re maintaining your version of the BoS’s legacy.',
			'trait': {
				'name': 'The Chain that Breaks',
				'description': 'You gain an additional Tag skill (must be Energy Weapons, Science, or Repair). You gain +1d20 junk, and can spend 1AP 3x for +1 uncom-mon material. You can make 1 addi-tional roll on loot tables without spending AP.'
			}
		},
        'nightkin': {
			'description': 'You’re a Super Mutant that retained your intelligence in the FEV process. The Master used you as top agents, and over time you developed an addiction to Stealth Boys. You likely suffer from schizophrenia, scopophobia, multiple personality disorder, or another psychological break.',
			'trait': {
				'name': 'Stealth Boy Addict',
				'description': 'Your Strength and Endurance base and maximum are increased by +2. Your Intelligence and Charisma are capped at 8. You cannot have more than 4 ranks in any skill. You’re immune to Poison and Radiation. You’re prone to Stealth Boy addic-tion. You’re sterile, and will face discrimination from non-Super Mutants.'
			}
		},
        'tribal': {
			'description': 'You grew up outside civilization but within the folds of your tribe.',
			'trait': {
				'name': 'Regressed',
				'description': 'Choose 2, or 1 and a perk:',
                'traits': {
                    'Mother Wasteland': 'Spend 1 Luck to gain cryptic/mystical insight (as if 3 AP spent to Obtain Information). Complications make pre-war artifacts harder to understand.',
                    'Nomad': 'Reroll 1d20 on Survival to travel, setup camp, and forage. Ignore the first complication on these tests. Barter and Speech have +1 difficulty when dealing with settlers. Cannot Tag Science.',
                    'Rite of Passage': 'Roll 1CD on first Luck use in each scene; effect negates Luck spend. Spend 1 AP to assist any PC that has not gone through your rite of passage.',
                    'Tools of the Old World': 'Use Survival instead of Repair or Science to repair or use pre-war tech. Complication range involving pre-war tech is increased by 2.',
                    'The Chosen One': 'The first d20 purchased for tests relating to your tribe’s quest is free, and you can auto-succeed at a cost. GM gets +2 AP when your quest comes up.'
                },
                'alternates': ['survivor', 'ncr'],
                canGhoul: true
			}
		}
    };

    let isGhoul = false;

    let selectedTraits = [];

    function handleTraitSelection(event) {
        const selected = Array.from(event.target.selectedOptions).map(option => option.value);
        selectedTraits = selected;
    }

    function getAllTraitsForOrigin(origin) {
        let allTraits = { ...originData[origin].trait.traits };

        if (originData[origin].trait.alternates) {
            originData[origin].trait.alternates.forEach(alternate => {
                const alternateTraits = originData[alternate]?.trait?.traits;
                if (alternateTraits) {
                    allTraits = { ...allTraits, ...alternateTraits };
                }
            });
        }
        return allTraits;
    }
</script>

<h1>Origin</h1>
<label for="char-name">Name: </label>
<input type="text" id="char-name" bind:value={charName} title="char-name">
<label for="level-select">Level: </label>
<input type="number" min="1" bind:value={level} id="level-select" title="level-select">
<label for="origin-select">Origin: </label>
<select name="origin-select" id="origin-select" bind:value={selectedOrigin} title="origin-select" class="origin-select">
    <optgroup label="core">
        <option value="brotherhood-initiate">brotherhood initiate</option>
        <option value="ghoul">ghoul</option>
        <option value="super-mutant">super mutant</option>
        <option value="mister-handy">mister handy</option>
        <option value="survivor">survivor</option>
        <option value="vault-dweller">vault dweller</option>
    </optgroup>
    <optgroup label="settlers">
        <option value="minuteman">commonwealth minuteman</option>
        <option value="ncr">new california republic</option>
        <option value="protectron">protectron</option>
        <option value="robobrain">robobrain</option>
        <option value="securitron">securitron</option>
    </optgroup>
    <optgroup label="winter of atom">
        <option value="synth">generation 3 synth</option>
        <option value="child-of-atom">child of atom</option>
    </optgroup>
    <optgroup label="wanderers">
        <option value="assaultron">assaultron</option>
        <option value="brotherhood-outcast">brotherhood outcast</option>
        <option value="nightkin">nightkin</option>
        <option value="tribal">tribal</option>
    </optgroup>
</select>

<pre>{originData[selectedOrigin].description}</pre>

{#if originData[selectedOrigin].trait.canGhoul === true}
    <label for="is-ghoul">Ghoul: </label>
    <input type="checkbox" id="is-ghoul" name="is-ghoul" bind:checked={isGhoul}>
{/if}

<h3>Trait:</h3>

{#if isGhoul === true}
    <p>{originData['ghoul'].trait.name}</p>

    <pre>{originData['ghoul'].trait.description}</pre>
{:else}
    <p>{originData[selectedOrigin].trait.name}</p>

    <pre>{originData[selectedOrigin].trait.description}</pre>

    {#if originData[selectedOrigin].trait.description === 'Choose 2, or 1 and a perk:'}
        <select multiple on:change={handleTraitSelection}>
            {#each Object.keys(getAllTraitsForOrigin(selectedOrigin)) as trait}
                <option value={trait}>{trait}</option>
            {/each}
        </select>
    {/if}
{/if}
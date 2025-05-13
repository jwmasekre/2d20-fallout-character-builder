INSERT INTO qualities (name, description) VALUES
('Accurate','If Aim, +1CD/AP up to 3, no additional ammo for extra damage'),
('Blast','Target zone instead of opponent, difficulty 2, half damage and ignore effects on miss'),
('Close Quarters', 'No difficulty increase within Reach of enemy'),
('Concealed', 'Not detected unless wielding or PER+Survival(2)'),
('Debilitating', '+1 difficulty to treat injuries from this weapon'),
('Gatling', 'Spend ammo at 10x, +2CD/10ammo spent'),
('Inaccurate', 'Cannot aim'),
('Mine', 'Damages anyone who enters Reach range'),
('Night Vision', 'No penalty if Aim in darkness'),
('Parry', 'Spend 1AP to +1 Defense against melee attack'),
('Recon', 'Aim = mark target; next attack gets reroll 1d20'),
('Reliable', 'Ignore first complication on use per encounter'),
('Suppressed', 'Not detected unless targeted by attack or PER+Survival(2)'),
('Thrown', 'AGI+Throwing to throw weapon'),
('Two-Handed', 'One-handed use increases difficulty by 2'),
('Unreliable', 'Complication range of attack +1');

UPDATE qualities SET opposed_to = '7' WHERE name = 'Accurate';
UPDATE qualities SET opposed_to = '1' WHERE name = 'Inaccurate';
UPDATE qualities SET opposed_to = '16' WHERE name = 'Reliable';
UPDATE qualities SET opposed_to = '12' WHERE name = 'Unreliable';
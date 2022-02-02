INSERT INTO public.dt_membership
(id, created, updated, "version", "name", months, interest, is_active, money_a, money_b, description_es, description_en)
VALUES('b7b18bc6-4129-4ce6-a6a6-e786a7146e06'::uuid, '2021-04-23 00:00:00.000', '2021-04-23 00:00:00.000', 1, 'Silver', 6, 0.05, false, 10000.0, 15000.0, 'Inversion de $10.000,00 a $15.000,00.
Duracion: 12 meses.
Ganancia mensual: 5%.
Ganancia Total: 60%.', 'Investment from $10.000,00 to $15.000,00.
12 months.
Monthly earnings 5%.
Yearly earnings 60%.');
UPDATE public.dt_suscription
SET created='2021-05-11 08:02:54.534', updated='2021-05-11 08:02:54.534', "version"=1, "userId"='f33900bd-88d4-4221-bd4a-000b188bccaa'::uuid, date_begin=1618984800, date_end=1634792400, "membershipId"='b7b18bc6-4129-4ce6-a6a6-e786a7146e06'::uuid, reinvestment=false
WHERE id='4b77cc9b-cdb2-42c0-aade-169f8fcc058a'::uuid;
INSERT INTO public.dt_withdrawal
(id, created, updated, "version", "userId", "date", "money", withdrawal_method, status, reference)
VALUES('fc6e9cb1-f4e0-4eb6-ab55-424344892afc'::uuid, '2021-11-01 00:00:00.000', '2021-11-01 00:00:00.000', 1, 'f33900bd-88d4-4221-bd4a-000b188bccaa'::uuid, 1635742800, 447.91, 'investment'::dt_withdrawal_withdrawal_method_enum, true, '');
INSERT INTO public.dt_deposit
(id, created, updated, "version", "date", "suscriptionId", "money", payment_method, reference)
VALUES('55187212-1daf-46d0-a4a6-3bd1121beca3'::uuid, '2021-11-01 00:00:00.000', '2021-11-01 00:00:00.000', 1, 1635742800, 'c4f4ac28-c77b-4b5d-89d6-8dbf6d371a9b'::uuid, 10447.91, 'balance'::dt_deposit_payment_method_enum, '');
UPDATE public.dt_user
SET created='2021-05-11 08:01:34.153', updated='2021-12-28 11:32:56.502', "version"=81, username=NULL, email='rmccammon@mccammoninc.com', telephone='+1 519 852 0170', "password"='$2a$10$zrrSslPEWEZobiwpMTVLC.bQucvDCRJQxW.795cQMijoU0O3fAw0m', change_password=false, firstname='Richard', lastname='McCammon', "role"='user'::dt_user_role_enum, status='pending'::dt_user_status_enum, "lastLogin"='2021-12-28 16:29:26.476', "lastQuery"='2021-12-28 16:32:56.482', "lastChangePassword"='2021-05-11 13:01:34.152', "firstDeposit"=1618984800, "lastDeposit"=1635742800, "seeWelcome"=true, "nextSupportPayment"=1652274094.178, id_time_zone='2a865dfe-9456-4d58-9eda-1d5145296211', state='Toronto', address='04409', paypal_account='rmccammon@mccammaninc.com', stripe_account='rmccammon@mccammaninc.com', coinpayments_account='rmccammon@mccammaninc.com', banck_name='', banck_address='', banck_account_name='', banck_account='', banck_routing_name='', banck_account_username='', banck_swift_code='', banck_iban='', "ref"='', "countryId"='5e53915e-f305-4b09-bf81-0f392ca26570'::uuid
WHERE id='f33900bd-88d4-4221-bd4a-000b188bccaa'::uuid;
DELETE FROM public.dt_record;

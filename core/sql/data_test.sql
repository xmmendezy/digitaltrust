INSERT INTO public."user"
(id, created, updated, "version", email, telephone, "password", change_password, firstname, lastname, "role", status, "lastLogin", "lastQuery", "lastChangePassword", id_time_zone, "countryId", state, address, paypal_account, stripe_account, coinpayments_account, "ref")
VALUES('f3a59480-4261-422d-afa3-9b46624f564b'::uuid, '2021-01-23 00:00:00.000', '2021-01-23 00:00:00.000', 1, 'mail@mail.com', '+593 97 946 7071', '$2a$10$y1j9ZQJb5Exr9I0ihngC3OPhYM00MLoz04HkvxKYcpZWbBJnqwXeG', false, 'Prueba', 'Prueba', 'user'::user_role_enum::user_role_enum, 'pending'::user_status_enum::user_status_enum, NULL, NULL, '2021-04-23 00:00:00.000', 'e49d115b-f5ff-448b-b486-fea10063e8dc', '8324c485-c22d-433d-98d8-f92f2403cd96'::uuid, 'Narnia', 'Avenida Siempreviva 742', 'mail@mail.com', 'mail@mail.com', 'mail@mail.com', '');
INSERT INTO public.suscription
(id, created, updated, "version", "membershipId", date_begin, date_end, "userId")
VALUES('6b938e36-3d33-4423-ab3c-746a411edd2a'::uuid, '2021-04-23 00:00:00', '2021-04-23 00:00:00', 1, '205710a1-69b8-45f7-9bae-c989cf7568c0', 1611378000, 1642914000, 'f3a59480-4261-422d-afa3-9b46624f564b');
INSERT INTO public.suscription
(id, created, updated, "version", "membershipId", date_begin, date_end, "userId")
VALUES('99aef155-87b0-44d5-afc5-9a6edba0b589'::uuid, '2021-04-23 00:00:00', '2021-04-23 00:00:00', 1, '98e95421-1c5d-4c8a-b763-ac7770e2ebc1', 1611378000, 1642914000, 'f3a59480-4261-422d-afa3-9b46624f564b');
INSERT INTO public.deposit
(id, created, updated, "version", "date", "suscriptionId", "money", payment_method)
VALUES('efaff3ec-a8c9-4dde-b1a5-1153361548d6'::uuid, '2021-04-23 00:00:00.000', '2021-04-23 00:00:00.000', 1, 1611378000, '6b938e36-3d33-4423-ab3c-746a411edd2a', 12000.0, 'paypal'::deposit_payment_method_enum::deposit_payment_method_enum);
INSERT INTO public.deposit
(id, created, updated, "version", "date", "suscriptionId", "money", payment_method)
VALUES('c2446432-2f5e-4a9a-8ccc-32c4e4e9d295'::uuid, '2021-04-23 00:00:00.000', '2021-04-23 00:00:00.000', 1, 1616475600, '6b938e36-3d33-4423-ab3c-746a411edd2a', 1200.0, 'balance'::deposit_payment_method_enum::deposit_payment_method_enum);
INSERT INTO public.deposit
(id, created, updated, "version", "date", "suscriptionId", "money", payment_method)
VALUES('c6f53814-dbbe-4dc9-b46c-5cf0428fe632'::uuid, '2021-04-23 00:00:00.000', '2021-04-23 00:00:00.000', 1, 1619154000, '99aef155-87b0-44d5-afc5-9a6edba0b589', 5000.0, 'blockchain'::deposit_payment_method_enum::deposit_payment_method_enum);
INSERT INTO public.deposit
(id, created, updated, "version", "date", "suscriptionId", "money", payment_method)
VALUES('bb210d8b-83cf-454b-a297-a1a3c77bf1dc'::uuid, '2021-04-23 00:00:00.000', '2021-04-23 00:00:00.000', 1, 1611378000, '99aef155-87b0-44d5-afc5-9a6edba0b589', 26000.0, 'stripe'::deposit_payment_method_enum::deposit_payment_method_enum);
INSERT INTO public.withdrawal
(id, created, updated, "version", "userId", "date", "money", withdrawal_method)
VALUES('da2b5a23-33f4-4163-8d80-cc92e81e1df8'::uuid, '2021-04-23 00:00:00.000', '2021-04-23 00:00:00.000', 1, 'f3a59480-4261-422d-afa3-9b46624f564b', 1616475600, 1200.0, 'investment'::withdrawal_withdrawal_method_enum::withdrawal_withdrawal_method_enum);
INSERT INTO public.withdrawal
(id, created, updated, "version", "userId", "date", "money", withdrawal_method)
VALUES('58bba840-f022-41f6-979c-78d6b8daa225'::uuid, '2021-04-23 00:00:00.000', '2021-04-23 00:00:00.000', 1, 'f3a59480-4261-422d-afa3-9b46624f564b', 1619326800, 5460.0, 'paypal'::withdrawal_withdrawal_method_enum::withdrawal_withdrawal_method_enum);

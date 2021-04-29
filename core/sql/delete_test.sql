DELETE FROM public.record WHERE "userId" = 'f3a59480-4261-422d-afa3-9b46624f564b';
DELETE FROM public.withdrawal WHERE "userId" = 'f3a59480-4261-422d-afa3-9b46624f564b';
DELETE FROM public.deposit WHERE "suscriptionId"  in ('6b938e36-3d33-4423-ab3c-746a411edd2a', '99aef155-87b0-44d5-afc5-9a6edba0b589');
DELETE FROM public.suscription WHERE "userId" = 'f3a59480-4261-422d-afa3-9b46624f564b';
DELETE FROM public.h_login WHERE "userId" = 'f3a59480-4261-422d-afa3-9b46624f564b';
DELETE FROM public.h_query WHERE "userId" = 'f3a59480-4261-422d-afa3-9b46624f564b';
DELETE FROM public.user WHERE id = 'f3a59480-4261-422d-afa3-9b46624f564b'

INSERT INTO users (id, email, name)
    VALUES
        ('ce81e279-1ec5-4ba5-8489-9a8789af24db', 'rei@nerv.com', 'Rei'),
        ('35c2b5d4-1ff8-492a-ac7c-1cd1566573f3', 'shinji@nerv.com', 'Shinji'),
        ('c4e2ac78-320d-4177-b76e-b95f8f0c1257', 'asuka@nerv.com', 'Asuka');
INSERT INTO maps (id, title, user_id)
    VALUES
        ('1af1a72c-4653-41f7-acc6-72348ffed990', 'JavaScript', 'c4e2ac78-320d-4177-b76e-b95f8f0c1257'),
        ('08cadc69-dfc2-43b4-b697-d3450ebee4db', 'HTTP', 'c4e2ac78-320d-4177-b76e-b95f8f0c1257'),
        ('e9c8d74c-5921-4fde-aad0-40e62bd96ac1', 'Node.js', 'c4e2ac78-320d-4177-b76e-b95f8f0c1257');
INSERT INTO nodes (id, content, parent_id, user_id, map_id) 
    VALUES
        ('6d2a768b-3233-4163-8658-b14098a570ad', 'history', '774af1e4-bd19-44f0-8855-3d6d50cac3a6', 'c4e2ac78-320d-4177-b76e-b95f8f0c1257', '1af1a72c-4653-41f7-acc6-72348ffed990'),
        ('e8ef2bbf-1d24-43bd-8954-c9528508d0aa', 'features', '774af1e4-bd19-44f0-8855-3d6d50cac3a6', 'c4e2ac78-320d-4177-b76e-b95f8f0c1257', '1af1a72c-4653-41f7-acc6-72348ffed990'),
        ('a081d167-b0ac-4edc-8aae-6971079e88d3', 'syntax', '774af1e4-bd19-44f0-8855-3d6d50cac3a6', 'c4e2ac78-320d-4177-b76e-b95f8f0c1257', '1af1a72c-4653-41f7-acc6-72348ffed990'),
        ('07a47831-7c15-4fd6-880f-7e5dac04b885', 'history', 'dcedcd2e-89a8-4947-92cf-4b83da509315', 'c4e2ac78-320d-4177-b76e-b95f8f0c1257', '08cadc69-dfc2-43b4-b697-d3450ebee4db'),
        ('1118fb6c-44d8-480c-9060-b99e1e388c64', 'session', 'dcedcd2e-89a8-4947-92cf-4b83da509315', 'c4e2ac78-320d-4177-b76e-b95f8f0c1257', '08cadc69-dfc2-43b4-b697-d3450ebee4db'),
        ('ae50588f-590e-4491-ae9a-a1fc69d32ac8', 'messages', 'dcedcd2e-89a8-4947-92cf-4b83da509315', 'c4e2ac78-320d-4177-b76e-b95f8f0c1257', '08cadc69-dfc2-43b4-b697-d3450ebee4db'),
        ('e57cb974-0f68-4cfc-9436-9a57b6ab9d7a', 'history', '31ea6ac2-f439-4005-8841-0582795c4d07', 'c4e2ac78-320d-4177-b76e-b95f8f0c1257', 'e9c8d74c-5921-4fde-aad0-40e62bd96ac1'),
        ('bb8b5cb7-557b-4fe0-a6b7-3a156933dff8', 'engine', '31ea6ac2-f439-4005-8841-0582795c4d07', 'c4e2ac78-320d-4177-b76e-b95f8f0c1257', 'e9c8d74c-5921-4fde-aad0-40e62bd96ac1'),
        ('b86b41e3-3522-4855-833e-bbe89ebc3f4f', 'event loop', '31ea6ac2-f439-4005-8841-0582795c4d07', 'c4e2ac78-320d-4177-b76e-b95f8f0c1257', 'e9c8d74c-5921-4fde-aad0-40e62bd96ac1');


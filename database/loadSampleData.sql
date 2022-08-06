INSERT INTO `csci4145`.`polls` (`id`, `title`, `answers`, `multiple_answers`, `status`, `date_created`, `creator_id`) VALUES
	(default, "Which sport is your favourite to watch?", '[{"id": 1, "text": "Soccer"}, {"id": 2, "text": "Basketball"}, {"id": 3, "text": "Hockey"}, {"id": 4, "text": "Football"}]', default, default, "20210101", '1'),
	(default, "Which is your favourite season?", '[{"id": 1, "text": "Spring"}, {"id": 2, "text": "Summer"}, {"id": 3, "text": "Fall"}, {"id": 4, "text": "Winter"}]', default, default, "20210101", '1'),
	(default, "Which social medias do you have?", '[{"id": 1, "text": "Facebook"}, {"id": 2, "text": "Twitter"}, {"id": 3, "text": "Instagram"}]', 1, default, "20210101", '1');

INSERT INTO `csci4145`.`votes` (`polls_id`, `user_id`, `answers`) VALUES
	(3, '1', '[1, 2]'),
	(3, '2', '[3]'),
	(3, '3', '[2, 3]');
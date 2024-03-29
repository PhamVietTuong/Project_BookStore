USE [BookStore]
GO
INSERT [dbo].[AspNetRoles] ([Id], [Name], [NormalizedName], [ConcurrencyStamp]) VALUES (N'5471733d-e430-478a-9e45-bc6ccea5cec8', N'Admin', N'ADMIN', N'6522be0a-49d8-47b9-a347-b863287fed5b')
INSERT [dbo].[AspNetRoles] ([Id], [Name], [NormalizedName], [ConcurrencyStamp]) VALUES (N'64b9bc07-056b-48f5-9172-db1876ac1b2f', N'User', N'USER', N'44f158b0-5ee4-45f8-99e0-5a613c907549')
INSERT [dbo].[AspNetUsers] ([Id], [FullName], [Address], [Birthday], [Status], [UserName], [NormalizedUserName], [Email], [NormalizedEmail], [EmailConfirmed], [PasswordHash], [SecurityStamp], [ConcurrencyStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEnd], [LockoutEnabled], [AccessFailedCount]) VALUES (N'5f29bf6f-709c-4ca2-b723-8fb75c112acf', N'Phạm Viết Tường', NULL, CAST(N'0001-01-01 00:00:00.0000000' AS DateTime2), 1, N'VietTuong', N'VIETTUONG', N'viettuong@gmail.com', N'VIETTUONG@GMAIL.COM', 0, N'AQAAAAEAACcQAAAAEFVRaGmxgLE8kaWOB2QJ4TA2eACIn4XHHsmwwFV1SRTkB9HFo/oZ0qYhKw2/tV5Xnw==', N'IWJ2IMSX6VNZGIT6SJEDMT5GFKPCSAPD', N'ab263779-3989-4e67-9d88-96badc5c36c5', NULL, 0, 0, NULL, 1, 0)
INSERT [dbo].[AspNetUsers] ([Id], [FullName], [Address], [Birthday], [Status], [UserName], [NormalizedUserName], [Email], [NormalizedEmail], [EmailConfirmed], [PasswordHash], [SecurityStamp], [ConcurrencyStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEnd], [LockoutEnabled], [AccessFailedCount]) VALUES (N'9d391c4d-42d1-4074-bae1-d05eed740ac7', N'Nguyễn Dương Vĩ Hào', NULL, CAST(N'0001-01-01 00:00:00.0000000' AS DateTime2), 1, N'Mycroft', N'MYCROFT', N'nvihao2003@gmail.com', N'NVIHAO2003@GMAIL.COM', 0, N'AQAAAAEAACcQAAAAEBk7JNBYZWEOfDJ/4PZaCBqz2HLuJcR/8JgjIROQC74vE2OF3OO5fwKYzkchK9MIpg==', N'QDH4RTF2GQHZ2EOSNOWXDRFLSESDOGTG', N'62a6c183-1349-4b09-854b-6987a785c059', NULL, 0, 0, NULL, 1, 0)
INSERT [dbo].[AspNetUsers] ([Id], [FullName], [Address], [Birthday], [Status], [UserName], [NormalizedUserName], [Email], [NormalizedEmail], [EmailConfirmed], [PasswordHash], [SecurityStamp], [ConcurrencyStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEnd], [LockoutEnabled], [AccessFailedCount]) VALUES (N'efd0a341-5b6c-43c4-89ce-d45d5bcf9cb6', N'Nguyễn Nhật Huy', NULL, CAST(N'0001-01-01 00:00:00.0000000' AS DateTime2), 1, N'NhatHuy', N'NHATHUY', N'nhathuy@gmail.com', N'NHATHUY@GMAIL.COM', 0, N'AQAAAAEAACcQAAAAEHC91gsbvWrsZB/EIpDA9CZECDleGAa/CbYUrNxZ262ZJN7lYe2XfOlYuQ5rM94tbg==', N'5NJN3OD7WZD764V4E6US44LMAIKZKTO5', N'88edd25f-7f2e-4ba4-be17-e64043a8a6b4', NULL, 0, 0, NULL, 1, 0)
INSERT [dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES (N'9d391c4d-42d1-4074-bae1-d05eed740ac7', N'5471733d-e430-478a-9e45-bc6ccea5cec8')
INSERT [dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES (N'5f29bf6f-709c-4ca2-b723-8fb75c112acf', N'64b9bc07-056b-48f5-9172-db1876ac1b2f')
INSERT [dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES (N'efd0a341-5b6c-43c4-89ce-d45d5bcf9cb6', N'64b9bc07-056b-48f5-9172-db1876ac1b2f')
SET IDENTITY_INSERT [dbo].[Authors] ON 

INSERT [dbo].[Authors] ([Id], [Name], [Status]) VALUES (1, N'Paulo Coelho, Blair T. Spalding', 1)
INSERT [dbo].[Authors] ([Id], [Name], [Status]) VALUES (2, N'Robin Sharma', 1)
INSERT [dbo].[Authors] ([Id], [Name], [Status]) VALUES (3, N'Hae Min, Haruki Murakami', 1)
INSERT [dbo].[Authors] ([Id], [Name], [Status]) VALUES (4, N'Thomas Harris', 1)
INSERT [dbo].[Authors] ([Id], [Name], [Status]) VALUES (5, N'Harper Lee, Jerome David Salinger', 1)
INSERT [dbo].[Authors] ([Id], [Name], [Status]) VALUES (6, N'Mộ Nhan Ca, Hae Min', 1)
INSERT [dbo].[Authors] ([Id], [Name], [Status]) VALUES (7, N'Malcolm Gladwell, Nassim Nicholas Taleb', 1)
INSERT [dbo].[Authors] ([Id], [Name], [Status]) VALUES (8, N'Robert B Cialdini, Dave Lakhani', 1)
INSERT [dbo].[Authors] ([Id], [Name], [Status]) VALUES (9, N'George Matthew Adams, Shiv Kher', 1)
INSERT [dbo].[Authors] ([Id], [Name], [Status]) VALUES (10, N'José Mauro de Vasconcelos', 1)
INSERT [dbo].[Authors] ([Id], [Name], [Status]) VALUES (11, N'Lois Lowry', 1)
INSERT [dbo].[Authors] ([Id], [Name], [Status]) VALUES (12, N'Daniel Pennac', 1)
INSERT [dbo].[Authors] ([Id], [Name], [Status]) VALUES (13, N'Jeffrey Archer', 1)
INSERT [dbo].[Authors] ([Id], [Name], [Status]) VALUES (14, N'Ernest Hemingway', 1)
INSERT [dbo].[Authors] ([Id], [Name], [Status]) VALUES (15, N'Hecto Malot', 1)
INSERT [dbo].[Authors] ([Id], [Name], [Status]) VALUES (16, N'Paulo Coelho', 1)
INSERT [dbo].[Authors] ([Id], [Name], [Status]) VALUES (17, N'Minato Kanae', 1)
INSERT [dbo].[Authors] ([Id], [Name], [Status]) VALUES (18, N'Ayn Rand', 1)
INSERT [dbo].[Authors] ([Id], [Name], [Status]) VALUES (19, N'Hector Malot', 1)
SET IDENTITY_INSERT [dbo].[Authors] OFF
SET IDENTITY_INSERT [dbo].[Categories] ON 

INSERT [dbo].[Categories] ([Id], [Name], [Status]) VALUES (1, N'Combo Văn Học', 1)
INSERT [dbo].[Categories] ([Id], [Name], [Status]) VALUES (2, N'Combo Kỹ Năng Sống', 1)
INSERT [dbo].[Categories] ([Id], [Name], [Status]) VALUES (3, N'Truyện Phương Tây', 1)
INSERT [dbo].[Categories] ([Id], [Name], [Status]) VALUES (4, N'Tiểu Thuyết', 1)
SET IDENTITY_INSERT [dbo].[Categories] OFF
SET IDENTITY_INSERT [dbo].[Promotions] ON 

INSERT [dbo].[Promotions] ([Id], [DateFrom], [DateTo], [PromotionPercentage]) VALUES (6, CAST(N'2024-01-01 00:00:00.0000000' AS DateTime2), CAST(N'2024-03-02 00:00:00.0000000' AS DateTime2), 5)
INSERT [dbo].[Promotions] ([Id], [DateFrom], [DateTo], [PromotionPercentage]) VALUES (7, CAST(N'2024-01-01 00:00:00.0000000' AS DateTime2), CAST(N'2024-03-02 00:00:00.0000000' AS DateTime2), 10)
INSERT [dbo].[Promotions] ([Id], [DateFrom], [DateTo], [PromotionPercentage]) VALUES (8, CAST(N'2024-01-01 00:00:00.0000000' AS DateTime2), CAST(N'2024-03-02 00:00:00.0000000' AS DateTime2), 20)
INSERT [dbo].[Promotions] ([Id], [DateFrom], [DateTo], [PromotionPercentage]) VALUES (9, CAST(N'2024-01-01 00:00:00.0000000' AS DateTime2), CAST(N'2024-03-02 00:00:00.0000000' AS DateTime2), 30)
SET IDENTITY_INSERT [dbo].[Promotions] OFF
SET IDENTITY_INSERT [dbo].[Publishers] ON 

INSERT [dbo].[Publishers] ([Id], [Name], [Status]) VALUES (1, N'Nhã Nam', 1)
INSERT [dbo].[Publishers] ([Id], [Name], [Status]) VALUES (2, N'Nhà Xuất Bản Trẻ', 1)
INSERT [dbo].[Publishers] ([Id], [Name], [Status]) VALUES (3, N'NXB Hội Nhà Văn', 1)
INSERT [dbo].[Publishers] ([Id], [Name], [Status]) VALUES (4, N'Alpha Books', 1)
INSERT [dbo].[Publishers] ([Id], [Name], [Status]) VALUES (5, N'Nhã Nam & NXB Hội Nhà Văn', 1)
INSERT [dbo].[Publishers] ([Id], [Name], [Status]) VALUES (6, N'Phụ Nữ', 1)
INSERT [dbo].[Publishers] ([Id], [Name], [Status]) VALUES (7, N'NXB Tổng hợp', 1)
INSERT [dbo].[Publishers] ([Id], [Name], [Status]) VALUES (8, N'NXB Văn Học 2011', 1)
INSERT [dbo].[Publishers] ([Id], [Name], [Status]) VALUES (9, N'NXBVăn Hóa', 1)
INSERT [dbo].[Publishers] ([Id], [Name], [Status]) VALUES (10, N'NXB Văn Học', 1)
INSERT [dbo].[Publishers] ([Id], [Name], [Status]) VALUES (11, N'NXB Thế Giới 05/2019', 1)
SET IDENTITY_INSERT [dbo].[Publishers] OFF
SET IDENTITY_INSERT [dbo].[Books] ON 

INSERT [dbo].[Books] ([Id], [PublisherId], [AuthorId], [CategoryId], [PromotionId], [Name], [Quantity], [Description], [Price], [Star], [Status], [CreateTime], [QuantitySold]) VALUES (12, 1, 1, 1, 6, N'Combo Sách Nhà Giả Kim + Hành Trình Về Phương Đông
', 9, N'"1. Nhà Giả Kim

Tất cả những trải nghiệm trong chuyến phiêu du theo đuổi vận mệnh của mình đã giúp Santiago thấu hiểu được ý nghĩa sâu xa nhất của hạnh phúc, hòa hợp với vũ trụ và con người. 

Tiểu thuyết Nhà giả kim của Paulo Coelho như một câu chuyện cổ tích giản dị, nhân ái, giàu chất thơ, thấm đẫm những minh triết huyền bí của phương Đông. Trong lần xuất bản đầu tiên tại Brazil vào năm 1988, sách chỉ bán được 900 bản. Nhưng, với số phận đặc biệt của cuốn sách dành cho toàn nhân loại, vượt ra ngoài biên giới quốc gia, Nhà giả kim đã làm rung động hàng triệu tâm hồn, trở thành một trong những cuốn sách bán chạy nhất mọi thời đại, và có thể làm thay đổi cuộc đời người đọc.

“Nhưng nhà luyện kim đan không quan tâm mấy đến những điều ấy. Ông đã từng thấy nhiều người đến rồi đi, trong khi ốc đảo và sa mạc vẫn là ốc đảo và sa mạc. Ông đã thấy vua chúa và kẻ ăn xin đi qua biển cát này, cái biển cát thường xuyên thay hình đổi dạng vì gió thổi nhưng vẫn mãi mãi là biển cát mà ông đã biết từ thuở nhỏ. Tuy vậy, tự đáy lòng mình, ông không thể không cảm thấy vui trước hạnh phúc của mỗi người lữ khách, sau bao ngày chỉ có cát vàng với trời xanh nay được thấy chà là xanh tươi hiện ra trước mắt. ‘Có thể Thượng đế tạo ra sa mạc chỉ để cho con người biết quý trọng cây chà là,’ ông nghĩ.”

2. Hành Trình Về Phương Đông

Hành Trình Về Phương Đông, một trong những tác phẩm đương đại hay và độc đáo nhất về văn hóa phương Đông vừa tái ngộ bạn đọc trong một diện mạo hoàn toàn mới, sang trọng và ấn tượng. Đây là ấn bản có lượng phát hành ấn tượng, hơn 40.000 bản tại Việt Nam chỉ trong vài năm trở lại đây.

Hành Trình Về Phương Đông kể về những trải nghiệm của một đoàn khoa học gồm các chuyên gia hàng đầu của Hội Khoa Học Hoàng Gia Anh được cử sang Ấn Độ nghiên cứu về huyền học và những khả năng siêu nhiên của con người. Suốt hai năm trời rong ruổi khắp các đền chùa Ấn Độ, diện kiến nhiều pháp thuật, nhiều cảnh mê tín dị đoan, thậm chí lừa đào… của nhiều pháp sư, đạo sĩ… họ được tiếp xúc với những vị chân tu thông thái sống ẩn dật ở thị trấn hay trên rặng Tuyết Sơn. Nhờ thế, họ được chứng kiến, trải nghiệm, hiểu biết sâu sắc về các khoa học cổ xức và bí truyền của văn hóa Ấn Độ như yoga, thiền định, thuật chiêm tinh, các phép dưỡng sinh và chữa bệnh, những kiến thức về nhân duyên, nghiệp báo, luật nhân quả, cõi sống và cõi chết…"
', 100000, 5, 1, CAST(N'2024-01-01 00:00:00.0000000' AS DateTime2), 0)
INSERT [dbo].[Books] ([Id], [PublisherId], [AuthorId], [CategoryId], [PromotionId], [Name], [Quantity], [Description], [Price], [Star], [Status], [CreateTime], [QuantitySold]) VALUES (13, 2, 2, 2, 7, N'Combo Sách Đời Ngắn Đừng Ngủ Dài + Ba Người Thầy Vĩ Đại
', 10, N'"1.Đời Ngắn Đừng Ngủ Dài

“Mọi lựa chọn đều giá trị. Mọi bước đi đều quan trọng. Cuộc sống vẫn diễn ra theo cách của nó, không phải theo cách của ta. Hãy kiên nhẫn. Tin tưởng. Hãy giống như người thợ cắt đá, đều đặn từng nhịp, ngày qua ngày. Cuối cùng, một nhát cắt duy nhất sẽ phá vỡ tảng đá và lộ ra viên kim cương. Người tràn đầy nhiệt huyết và tận tâm với việc mình làm không bao giờ bị chối bỏ. Sự thật là thế.”

Bằng những lời chia sẻ thật ngắn gọn, dễ hiểu về những trải nghiệm và suy ngẫm trong đời, Robin Sharma tiếp tục phong cách viết của ông từ cuốn sáchĐiều vĩ đại đời thườngđể mang đến cho độc giả những bài viết như lời tâm sự, vừa chân thành vừa sâu sắc.

2.Ba Người Thầy Vĩ Đại

“Tôi đã nếm trải nhiều thất bại trong hành trình đi qua những tháng ngày của mình. Thế nhưng, mỗi chướng ngại cuối cùng đều lại chính là một bàn đạp đưa tôi gần hơn nữa tới chân lý trong tâm khảm và cuộc đời tốt đẹp nhất của mình."
', 152000, 5, 1, CAST(N'2024-01-01 00:00:00.0000000' AS DateTime2), 0)
INSERT [dbo].[Books] ([Id], [PublisherId], [AuthorId], [CategoryId], [PromotionId], [Name], [Quantity], [Description], [Price], [Star], [Status], [CreateTime], [QuantitySold]) VALUES (14, 1, 3, 1, 7, N'Combo Sách Tiểu Thuyết Hấp Dẫn: Rừng Na Uy + Yêu Những Điều Không Hoàn Hảo
', 9, N'"1. Rừng Na Uy

Câu chuyện bắt đầu từ một chuyến bay trong ngày mưa ảm đạm, một người đàn ông 37 tuổi chợt nghe thấy bài hát gắn liền với hình ảnh người yêu cũ, thế là quá khứ ùa về xâm chiếm thực tại. Mười tám năm trước, người đàn ông ấy là chàng Toru Wanatabe trẻ trung, mỗi chủ nhật lại cùng nàng Naoko lang thang vô định trên những con phố Tokyo. Họ sánh bước bên nhau để thấy mình còn sống, còn tồn tại, và gắng gượng tiếp tục sống, tiếp tục tồn tại sau cái chết của người bạn cũ Kizuki. Cho đến khi Toru nhận ra rằng mình thực sự yêu và cần có Naoko thì cũng là lúc nàng không thể chạy trốn những ám ảnh quá khứ, không thể hòa nhập với cuộc sống thực tại và trở về dưỡng bệnh trong một khu trị liệu khép kín. Toru, bên cạnh giảng đường vô nghĩa chán ngắt, bên cạnh những đêm chơi bời chuyển từ cảm giác thích thú đến uể oải, ghê tởm...vẫn kiên nhẫn chờ đợi và hy vọng vào sự hồi phục của Naoko. Cuối cùng, những lá thư, những lần thăm hỏi, hồi ức về lần ân ái duy nhất của Toru không thể níu Naoko ở lại, nàng chọn cái chết như một lối đi thanh thản. Từ trong mất mát, Toru nhận ra rằng mình cần tiếp tục sống và bắt đầu tình yêu mới với Midori.
2. Yêu Những Điều Không Hoàn Hảo

“Ngẫm lại cuộc sống của chính mình, ta sẽ nhận thấy rất nhiều điều không hoàn hảo. Trước hết, chỉ nhìn vào bản thân mình thôi ta đã cảm nhận được nhiều thiếu sót rồi: lời nói và hành động mâu thuẫn với nhau, vụng về trong những mối quan hệ xã hội, chuyện học hành, công việc không suôn sẻ như ý muốn. Chưa kể đôi khi ta còn khiến người khác tổn thương, thậm chí còn làm những việc khiến bản thân cảm thấy tội lỗi và hối hận. Và khi nhìn vào những người thân trong gia đình, bạn bè, đồng nghiệp, ta cũng nhận thấy những điều không-hoàn-hảo tương tự như vậy."
', 214000, 5, 1, CAST(N'2024-01-01 00:00:00.0000000' AS DateTime2), 0)
INSERT [dbo].[Books] ([Id], [PublisherId], [AuthorId], [CategoryId], [PromotionId], [Name], [Quantity], [Description], [Price], [Star], [Status], [CreateTime], [QuantitySold]) VALUES (21, 1, 4, 1, 6, N'Combo Sách Hannibal Và Sự Im Lặng Của Bầy Cừu 
', 8, N'"1. Hannibal
Được xem là một trong những sự kiện văn chương được chờ đợi nhất, Hannibal và những ngày run rẩy bắt đầu mang người đọc vào cung điện ký ức của một kẻ ăn thịt người, tạo dựng nên một bức chân dung ớn lạnh của tội ác đang âm thầm sinh sôi – một thành công của thể loại kinh dị tâm lý.
Với Mason Verger, nạn nhân đã bịHannibal biến thành kẻ người không ra người,Hannibal là mối hận thù nhức nhối da thịt.
Với đặc vụ Clarice Starling của FBI, người từng thẩm vấnHannibal trong trại tâm thần, giọng kim ken két của hắn vẫn vang vọng trong giấc mơ cô.
Với cảnh sát Rinaldo Pazzi đang thất thế, Lecter hứa hẹn mang tới một khoản tiền béo bở để đổi vận.
Và những cuộc săn lùng Hannibal Lecter bắt đầu, kéo theo đó là những chuỗi ngày run rẩy hòng chấm dứt bảy năm tự do của hắn. Nhưng trong ba kẻ đi săn, chỉ một kẻ có bản lĩnh sống trụ lại để hưởng thành quả của mình.
2. Sự Im Lặng Của Bầy Cừu

Những cuộc phỏng vấn ở xà lim với kẻ ăn thịt người ham thích trò đùa trí tuệ, những tiết lộ nửa chừng hắn chỉ dành cho kẻ nào thông minh, những cái nhìn xuyên thấu thân phận và suy tư của cô mà đôi khi cô muốn lảng tránh... Clarice Starling đã dấn thân vào cuộc điều tra án giết người lột da hàng loạt như thế, để rồi trong tiếng bức bối của chiếc đồng hồ đếm ngược về cái chết, cô phải vật lộn để chấm dứt tiếng kêu bao lâu nay vẫn đeo đẳng giấc mơ mình: tiếng kêu của bầy cừu sắp bị đem đi giết thịt"
', 193000, 5, 1, CAST(N'2024-01-01 00:00:00.0000000' AS DateTime2), 0)
INSERT [dbo].[Books] ([Id], [PublisherId], [AuthorId], [CategoryId], [PromotionId], [Name], [Quantity], [Description], [Price], [Star], [Status], [CreateTime], [QuantitySold]) VALUES (23, 3, 5, 1, 6, N'Combo Sách Bắt Trẻ Đồng Xanh + Giết Con Chim Nhại
', 7, N'"1. Bắt Trẻ Đồng Xanh
Holden Caulfield, 17 tuổi, đã từng bị đuổi học khỏi ba trường, và trường dự bị đại học Pencey Prep là ngôi trường thứ tư. Và rôi cậu lại trượt 4 trên 5 môn học và nhận được thông báo đuổi học. Câu chuyện kể về chuỗi ngày tiếp theo sau đó của Holden, với ánh nhìn cay độc, giễu cợt vào một cuộc đời tẻ nhạt, xấu xa, trụy lạc và vô phương hướng của một thanh niên trẻ.
Bắt trẻ đồng xanh đã từng trở thành chủ đề tranh luận hết sức sâu rộng tại Mỹ. Sau rất nhiều thị phi, tác phẩm đã được đưa vào giảng dạy tại chương trình trung học Mỹ. Và hơn thế, tạp chí Time đã xếp Bắt trẻ đồng xanh vào một trong 100 tác phẩm viết bằng tiếng Anh hay nhất từ năm 1923 đến nay.
2. Giết Con Chim Nhại
Nào, hãy mở cuốn sách này ra. Bạn phải làm quen ngay với bố Atticus của hai anh em - Jem và Scout, ông bố luật sư có một cách riêng, để những đứa trẻ của mình cứng cáp và vững vàng hơn khi đón nhận những bức xúc không sao hiểu nổi trong cuộc sống. Bạn sẽ nhớ rất lâu người đàn ông thích trốn trong nhà Boo Radley, kẻ bị đám đông coi là lập dị đã chọn một cách rất riêng để gửi những món quà nhỏ cho Jem và Scout, và khi chúng lâm nguy, đã đột nhiên xuất hiện để che chở. Và tất nhiên, bạn không thể bỏ qua anh chàng Tom Robinson, kẻ bị kết án tử hình vì tội hãm hiếp một cô gái da trắng, sự thật thà và suy nghĩ quá đỗi đơn giản của anh lại dẫn đến một cái kết hết sức đau lòng, chỉ vì lý do anh là một người da đen.  "
', 158000, 5, 1, CAST(N'2024-01-01 00:00:00.0000000' AS DateTime2), 0)
INSERT [dbo].[Books] ([Id], [PublisherId], [AuthorId], [CategoryId], [PromotionId], [Name], [Quantity], [Description], [Price], [Star], [Status], [CreateTime], [QuantitySold]) VALUES (24, 1, 6, 1, 6, N'Combo Sách Bước Chậm Lại Giữa Thế Gian Vội Vã + Lòng Tốt Của Bạn Cần Thêm Đôi Phần Sắc Sảo
', 6, N'"1. Bước Chậm Lại Giữa Thế Gian Vội Vã
Chen vai thích cánh để có một chỗ bám trên xe buýt giờ đi làm, nhích từng xentimét bánh xe trên đường lúc tan sở, quay cuồng với thi cử và tiến độ công việc, lu bù vướng mắc trong những mối quan hệ cả thân lẫn sơ… bạn có luôn cảm thấy thế gian xung quanh mình đang xoay chuyển quá vội vàng?
Nếu có thể, hãy tạm dừng một bước.
Để tự hỏi, là do thế gian này vội vàng hay do chính tâm trí bạn đang quá bận rộn? Để cầm cuốn sách nhỏ dung dị mà lắng đọng này lên, chậm rãi lật giở từng trang, thong thả khám phá những điều mà chỉ khi bước chậm lại mới có thể thấu rõ: về các mối quan hệ, về chính bản thân mình, về những trăn trở trước cuộc đời và nhân thế, về bao điều lý trí rất hiểu nhưng trái tim chưa cách nào nghe theo…
2. Lòng Tốt Của Bạn Cần Thêm Đôi Phần Sắc Sảo
“Một người có thể sống cả đời theo cách mình thích là chuyện vô cùng khó khăn.
Chúng ta không giây phút nào không bị thế giới bên ngoài chỉ trỏ, lâu dần sẽ quên mất tâm tư ban sơ, mất đi khả năng suy nghĩ độc lập và giữ vững cái tôi.
So với từng câu từng câu an ủi dịu dàng, tôi nghĩ chúng ta cần một chậu nước lạnh hơn. Nó sẽ giúp chúng ta tỉnh táo ý thức được tính tình cáu bẳn của mình, tầm nhìn và lòng dạ hạn hẹp của mình, EQ thấp của mình, và tất cả những vấn đề mà bản thân chúng ta không nhìn rõ, nhưng người khác thấy rõ mồn một mà không muốn nói cho chúng ta biết.
Khi bạn khốn đốn, hoang mang, nếu đọc được cuốn sách này, mong rằng bạn có thể rút ra sức mạnh từ trong câu chữ của nó, đừng nộp vũ khí đầu hàng thế giới này. "
', 155000, 5, 1, CAST(N'2024-01-01 00:00:00.0000000' AS DateTime2), 0)
INSERT [dbo].[Books] ([Id], [PublisherId], [AuthorId], [CategoryId], [PromotionId], [Name], [Quantity], [Description], [Price], [Star], [Status], [CreateTime], [QuantitySold]) VALUES (25, 4, 7, 2, 8, N'Combo Sách Về Tư Duy Cực Kỳ Thú Vị: Trong Chớp Mắt + Thiên Nga Đen
', 6, N'"1. Thiên Nga Đen

Trước khi khám phá ra thiên nga đen tồn tại trên đời (ở Úc), người ta vẫn tin rằng tất cả chim thiên nga trên đời đều có màu trắng. Phát hiện bất ngờ này đã thay đổi toàn bộ thế giới quan của nhân loại (về thiên nga).
Chúng ta không biết rất nhiều thứ nhưng lại hành động như thể mình có khả năng dự đoán được mọi điều. Và trong cuốn sách này, tác giả Nassim Nicholas Taleb đã đi sâu vào khai thác những sai lầm của tư tưởng cố hữu ấy. Theo ông, “thiên nga đen” là một biến cố tưởng chừng như không thể xảy ra với ba đặc điểm chính: không thể dự đoán, có tác động nặng nề và sau khi nó xảy ra, người ta lại dựng lên một lời giải thích để khiến nó trở nên ít ngẫu nhiên hơn, dễ dự đoán hơn so với bản chất thật của nó. Thành công đáng kinh ngạc của Facebook có thể được coi là một “thiên nga đen”, việc nước Anh rời khỏi Liên minh châu Âu cũng là một “thiên nga đen”. Thiên nga đen luôn ẩn hiện trong mọi mặt của cuộc sống với những tác động khó lường, theo cả hướng tiêu cực và tích cực.
Tinh tế, táo bạo nhưng không kém phần thú vị, Thiên Nga Đen chắc chắn là cuốn sách không thể bỏ qua cho những ai đam mê hiểu biết. Và cuốn sách này, bản thân nó cũng chính là một thiên nga đen…

2. Trong Chớp Mắt
Trong chớp mắt là một cuốn sách chiến lược viết về sức mạnh của việc nghĩ mà không cần suy nghĩ, về những quyết định đưa ra chỉ trong một cái chớp mắt thực sự không hề tầm thường như mọi người vẫn nghĩ. Vì sao một số người luôn là những người quyết định sáng suốt, trong khi số khác lại luôn lầm lẫn, quẩn quanh… Tại sao một số người hành động theo bản năng của họ và chiến thắng, một số người lại luôn kết thúc bằng sai lầm. Não của chúng ta thực sự hoạt động thế nào: trong công sở, trong lớp học, trong bếp và phòng ngủ… Và vì sao những quyết định đúng đắn nhất lại thường là những quyết định không thể lý giải rõ ràng cho người khác.

"
', 357000, 5, 1, CAST(N'2024-01-01 00:00:00.0000000' AS DateTime2), 0)
INSERT [dbo].[Books] ([Id], [PublisherId], [AuthorId], [CategoryId], [PromotionId], [Name], [Quantity], [Description], [Price], [Star], [Status], [CreateTime], [QuantitySold]) VALUES (26, 4, 8, 2, 8, N'Combo Sách Bậc Thầy Thuyết Phục: Những Đòn Tâm Lý Trong Thuyết Phục + Phong Thái Của Bậc Thầy Thuyết Phục
', 62, N'"1. Bậc Thầy Thuyết Phục: Những Đòn Tâm Lý Trong Thuyết Phục

Tại sao một số người lại có sức thuyết phục đến mê hoặc và luôn là người làm chủ Trò chơi Thuyết phục? Đâu là những động lực vô hình đằng sau thứ sức mạnh thôi thúc chúng ta đồng thuận với người khác? Những thủ thuật được các bậc thầy thuyết phục sử dụng tài tình là gì, làm thế nào đánh bại các thủ thuật đó - đồng thời biến chúng thành ""vũ khí bí mật"" của chính bạn
Với Những Đòn Tâm Lý Trong Thuyết Phục, bạn sẽ có lời giải đáp cho tất cả những câu hỏi ấy. Trong Những Đòn Tâm Lý Trong Thuyết Phục, nhà tâm lý học nổi tiếng Robert B. Cialdini tiết lộ 6 ""vũ khí"" gây ảnh hưởng đầy uy lực: cam kết và nhất quán, khan hiếm, đáp trả, bằng chứng xã hội, uy quyền và thiện cảm. Mỗi loại lại bị chi phối bởi một nguyên tắc tâm lý cơ bản điều khiển hành vi con người và nhờ đó mà tạo nên sức mạnh cho mỗi thủ thuật. Đặc biệt khi được kết  hợp với nhau, chúng sẽ tạo ra ảnh hưởng vô cùng lớn.
2. Phong Thái Của Bậc Thầy Thuyết Phục

Là người bán hàng, bạn mong muốn có thể khiến khách hàng đưa ra quyết định mua hàng nhanh chóng.
Là lãnh đạo, bạn mong muốn nhân viên luôn sẵn lòng ủng hộ và tin tưởng.
Là người làm quảng cáo, bạn mong muốn bất cứ ai xem quảng cáo của mình cũng bị thu hút và buộc phải hành động...
Để thực hiện thành công tất cả những điều đó, bạn không thể không có một kỹ năng hiệu quả - kỹ năng thuyết phục.
Trong Phong thái của bậc thầy thuyết phục, bạn sẽ tìm thấy: Sự khác biệt căn bản giữa thuyết phục và dụ dỗ. Một sơ đồ hoàn chỉnh của quá trình thuyết phục. Một bộ công cụ thuyết phục và bảng hướng dẫn sử dụng chi tiết."
', 207000, 5, 1, CAST(N'2024-01-01 00:00:00.0000000' AS DateTime2), 0)
INSERT [dbo].[Books] ([Id], [PublisherId], [AuthorId], [CategoryId], [PromotionId], [Name], [Quantity], [Description], [Price], [Star], [Status], [CreateTime], [QuantitySold]) VALUES (27, 7, 9, 2, 8, N'Combo Sách You Can - Không Gì Là Không Thể + You Can Win - Bí Quyết Người Chiến Thắng
', 23, N'"1. You Can Win - Bí Quyết Người Chiến Thắng

Với cách đặt vấn đề dễ hiểu, thiết thực và sâu sắc, Bí quyết của người chiến thắng sẽ giúp bạn tránh rơi vào cảm giác mất phương hướng, biết xác định mục tiêu và những giá trị cần ưu tiên trong cuộc sống. Có thể xem cuốn sách này như một quyển sổ tay liệt kê những công cụ cần thiết để kiến tao thành công và giúp bạn tạo lập một cuộc sống tốt đẹp. Cũng có thể xem nó như một cuốn cảm nang dạy nấu ăn, bao gồm những chỉ dần về nguyên liệu, công thức và cách pha trộn theo tỉ lệ thích hợp để có được thành công.

Nhưng trên hết, đây là cuốn sách từng bước dẫn dặt bạn đi từ mơ ước, khát vọng thành công đến khám phá năng lực của bản thân và biến ước mơ thành hiện thực.   Bí quyết sẽ giúp bạn xây dựng mục tiêu mới, hình thành ý niệm mới về mục đích sống, phát triển tư tưởng mới về bản thân và tương lai.
2. You Can - Không Gì Là Không Thể

Tự bao đời nay, thành công luôn là ước mơ và là mục tiêu của con người. Theo đó, những câu hỏi như “Thành công là gì?” hay “Làm thế nào để đạt được thành công?” luôn khiến con người phải trăn trở. Liệu thành công có phải là khi chúng ta có thật nhiều tiền, sở hữu những tiện nghi hiện đại và sống một cuộc đời vương giả? Hay thành công là khi ta có một công việc ổn định và một gia đình hạnh phúc? Trong quá trình tìm kiếm câu trả lời cho những trăn trở của mình, nhiều người đã nhận ra rằng, thành công thật sự không chỉ được đo bằng vật chất sở hữu được mà còn đến từ những giá trị vô giá về mặt tinh thần. Cuộc sống hiện đại mở ra cho con người nhiều cơ hội để thành công, nhưng đồng thời cũng mang đến không ít thách thức. Chắc chắn khi đối mặt với những thách thức đó, không ít người trong chúng ta cảm thấy bế tắc và cần lắm những lời khuyên bổ ích."
', 141000, 5, 1, CAST(N'2024-01-01 00:00:00.0000000' AS DateTime2), 0)
INSERT [dbo].[Books] ([Id], [PublisherId], [AuthorId], [CategoryId], [PromotionId], [Name], [Quantity], [Description], [Price], [Star], [Status], [CreateTime], [QuantitySold]) VALUES (28, 3, 10, 3, 6, N'Cây Cam Ngọt Của Tôi
', 16, N'"Cây cam ngọt của tôi kể về Zezé – một cậu bé 5 tuổi sống trong một gia đình nghèo khó có nhiều anh chị em ở Brazil. Đó là hành trình của nỗi đau, của tình yêu thương và hơn hết, của tâm hồn trẻ thơ đơn sơ, giàu trí tưởng tượng nhưng cũng đầy tổn thương. Những câu chuyện xung quanh Zezé, đi học, chuyển nhà, mối quan hệ với gia đình và những người bạn: cây cam ngọt sau vườn và Ông Bồ, một người bằng xương bằng thịt chứ không chỉ trong tưởng tượng của Zezé. Với văn phong trong trẻo dễ chịu, mình bật cười trước những câu hỏi ngây ngô của Zezé, nhíu mày với những trò nghịch ngợm nhưng cũng khóc nhiều vì những tổn thương mà đáng lẽ ra một đứa bé 5 tuổi không và tuyệt đối không thể có.

Điều đầu tiên phải nhắc đến trong cuộc đời Zezé – cái nghèo. Cha cậu bị đuổi việc và đang thất nghiệp, một mình mẹ phải bươn chải nuôi cả gia đình. Và cũng bởi vì nghèo và nỗi khắc khổ, mà dường như trái tim thiện lương, bao dung của mọi người đã bị che mờ.

Đọc tác phẩm này, mình nhớ lại thời trẻ thơ của mình, dù không có những biến cố khủng khiếp như Zezé nhưng từ những suy nghĩ và nhiều tính cách của Zezé giúp mình cảm thông, thấu hiểu và bao dung hơn rất nhiều. Mình biết từ giờ trở đi mình phải đối xử ra sao, phải làm như thế nào với những đứa trẻ mình sẽ gặp trong đời."
', 84000, 5, 1, CAST(N'2024-01-01 00:00:00.0000000' AS DateTime2), 0)
INSERT [dbo].[Books] ([Id], [PublisherId], [AuthorId], [CategoryId], [PromotionId], [Name], [Quantity], [Description], [Price], [Star], [Status], [CreateTime], [QuantitySold]) VALUES (30, 5, 11, 4, 6, N'Người Truyền Ký Ức
', 15, N'"Cho dù một ai đã từng đọc những lời giới thiệu ngắn gọn xung quanh cuốn sách, không đọc cũng không thể nào cảm nhận hết sự kỳ lạ của nó. Người truyền ký ức tuyệt vời ở trí tưởng tưởng và những thông điệp mang theo.

Một cộng đồng không được xác định rõ về không gian và thời gian tồn tại, chỉ biết những thành phần của nó có hình hài giống như con người, và một vài cấu trúc cũng giống như con người. Đứng đầu cộng đồng có một Hội đồng quyết định tất thảy mọi việc, dĩ nhiên, vẫn còn một thế lực cao siêu nào đó hơn nữa, chỉ huy về tổng thể. Mỗi cá nhân sinh ra không bởi cha mẹ họ, mà bởi những Mẹ đẻ, những người phụ nữ được nhận Nhiệm vụ sinh nở ra bé mới cho cộng đồng.

Khi sinh ra, bé mới sẽ được Hội đồng giao cho một cặp bố mẹ nuôi. Mỗi nấc tuổi là một lớp người của cộng đồng khác biệt nhau về chức năng, vị trí. Lên Bảy, mỗi đứa trẻ sẽ được giao một chiếc xe đạp, chứng tỏ một nấc trưởng thành. Và khi lên Mười Hai, chúng sẽ được nhận một Nhiệm vụ riêng (tức là một công việc để duy trì cộng đồng). Rồi lớn hơn nữa, chúng sẽ được tách nhà, kết hợp với một người khác giới để tạo nên một nhà mới, nhận hai đứa bé, một trai, một gái về làm con. Trong cộng đồng đó, tất cả mọi thứ đều phải công khai cho dù là một giấc mơ, và tất cả đều nằm trong giới luật cho dù là việc phải ăn hết một bữa điểm tâm. Không có đau khổ nào, tất cả bằng lặng trôi theo một nguyên tắc bất biến. Kể cả sự phóng thích ai đó ra khỏi cộng đồng, đến Nơi Khác vĩnh viễn."
', 80000, 5, 1, CAST(N'2024-01-01 00:00:00.0000000' AS DateTime2), 0)
INSERT [dbo].[Books] ([Id], [PublisherId], [AuthorId], [CategoryId], [PromotionId], [Name], [Quantity], [Description], [Price], [Star], [Status], [CreateTime], [QuantitySold]) VALUES (31, 6, 12, 4, 6, N'Như Một Cuốn Tiểu Thuyết
', 20, N'"Như một cuốn tiểu thuyết hẳn nhiên không phải là tiểu thuyết, mà lại được viết như tiểu thuyết, được đọc như tiểu thuyết... Đó là những quan sát, ghi chép về những thắc mắc, nghi ngờ, truy vấn, bàn bạc, tranh cãi, thậm chí giận hờn, trách móc giữa ba nhóm nhân vật (đôi khi có tên, thường thì không có tên): người lớn (cha mẹ, thầy giáo, người thân), trẻ em (con cái, học trò) và sách (danh từ chung, số nhiều, đại diện cho văn chương)!


Nhiều tình tiết ly kỳ, đầy kịch tính, phô bày những nghịch lý hiển nhiên mà đôi khi giáo dục học phải thốt nên lời bất lực: phải đọc - trẻ mở trang sách ra và... ngủ! Cấm đọc - trẻ trốn vào chăn và... nuốt gọn quyển sách! Khi chưa biết đọc, đứa trẻ là độc giả trung thành mỗi đêm với những chuyện kể từ trang sách. Đến khi đọc thông viết thạo, chàng trai cô gái ấy đếm từng trang sách như một cực hình!




Ai đã biến sách thành bức tường đá và dìm niềm vui đọc sách vào vực xoáy thẳm sâu? Cha mẹ, thầy cô, khoa sư phạm, hay truyền hình và đủ thứ món giải trí khác thời nay?


Đầy những phát hiện thú vị, hấp dẫn, nhiều ẩn dụ, so sánh bất ngờ, độc đáo, cuốn “tiểu thuyết bốn chương, 67 hồi” này là một giáo trình tâm lý học dẫn dắt chúng ta cùng đi khám phá và tìm ra bí quyết nuôi dưỡng niềm say mê, sự hứng thú với văn chương trong suốt cuộc đời."
', 50000, 5, 1, CAST(N'2024-01-01 00:00:00.0000000' AS DateTime2), 0)
INSERT [dbo].[Books] ([Id], [PublisherId], [AuthorId], [CategoryId], [PromotionId], [Name], [Quantity], [Description], [Price], [Star], [Status], [CreateTime], [QuantitySold]) VALUES (32, 8, 13, 4, 7, N'Hai Số Phận
', 8, N'"Hai Số Phận (Bìa Cứng) là cuốn sách không chỉ đơn thuần là một cuốn tiểu thuyết đây có thể coi như là ""thánh kinh"" cho những người không dễ dãi chấp nhận lối mòn, cuốn sách được nhiều độc giả yêu thích.

“Hai số phận” làm rung động mọi trái tim quả cảm, nó có thể làm thay đổi cả cuộc đời bạn. Đọc cuốn sách này, bạn sẽ bị chi phối bởi cá tính của hai nhân vật chính, hoặc bạn là Kane, hoặc sẽ là Abel, không thể nào nhầm lẫn. Và điều đó sẽ khiến bạn thấy được chính mình.

Khi bạn yêu thích tác phẩm này, người ta sẽ nhìn ra cá tính và tâm hồn thú vị của bạn!

“Nếu có giải thưởng Nobel về khả năng kể chuyện, giải thưởng đó chắc chắn sẽ thuộc về Archer.” - Daily Telegraph

“Hai số phận” (Kane & Abel) là câu chuyện về hai người đàn ông đi tìm vinh quang. William Kane là con một triệu phú nổi tiếng trên đất Mỹ, lớn lên trong nhung lụa của thế giới thượng lưu. Wladek Koskiewicz là đứa trẻ không rõ xuất thân, được gia đình người bẫy thú nhặt về nuôi. Một người được ấn định để trở thành chủ ngân hàng khi lớn lên, người kia nhập cư vào Mỹ cùng đoàn người nghèo khổ. 

Trải qua hơn sáu mươi năm với biết bao biến động, hai con người giàu hoài bão miệt mài xây dựng vận mệnh của mình . “Hai số phận” nói về nỗi khát khao cháy bỏng, những nghĩa cử, những mối thâm thù, từng bước đường phiêu lưu, hiện thực thế giới và những góc khuấ mê hoặc người đọc bằng ngôn từ cô đọng, hai mạch truyện song song được xây dựng tinh tế từ những chi tiết nhỏ nhất.) 

Giá sản phẩm trên Tiki đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như phí vận chuyển, phụ phí hàng cồng kềnh, thuế nhập khẩu (đối với đơn hàng giao từ nước ngoài có giá trị trên 1 triệu đồng)....."
', 211500, 5, 1, CAST(N'2024-01-01 00:00:00.0000000' AS DateTime2), 0)
INSERT [dbo].[Books] ([Id], [PublisherId], [AuthorId], [CategoryId], [PromotionId], [Name], [Quantity], [Description], [Price], [Star], [Status], [CreateTime], [QuantitySold]) VALUES (33, 10, 14, 1, 7, N'Ông Già Và Biển Cả
', 42, N'"Lão đã già, một mình một thuyền câu cá trên dòng Nhiệt lưu và đã tám mươi tư ngày qua lão không bắt được lấy một mống cá nào. Bốn mươi ngay đầu thằng bé đi với lão. Nhưng sau bốn
mươi ngày không câu được cá, cha mẹ thằng bé bảo nó rằng rốt cuộc bây giờ ông lão đã hoàn toàn salao, cách diễn đạt tệ nhất của vận rủi, rồi buộc nó đi theo thuyền khác và ngay trong tuần lễ đầu tiên chiếc thuyền ấy đã câu được ba con cá lớn. Điều đó khiến thằng bé buồn khi hằng ngày thấy ông lão trở về với chiếc thuyền không, nó luôn xuống giúp lão mang khi thì cuộn dây, cái lao móc săn cá, khi thi cái sào hay tấm buồm quấn quanh cột. Tấm buồm được vá bằng bao bột, cuộn lại trông như một lá cờ bại trận triền miên.

Giá sản phẩm trên Tiki đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như phí vận chuyển, phụ phí hàng cồng kềnh, thuế nhập khẩu (đối với đơn hàng giao từ nước ngoài có giá trị trên 1 triệu đồng)....."
', 36000, 5, 1, CAST(N'2024-01-01 00:00:00.0000000' AS DateTime2), 0)
INSERT [dbo].[Books] ([Id], [PublisherId], [AuthorId], [CategoryId], [PromotionId], [Name], [Quantity], [Description], [Price], [Star], [Status], [CreateTime], [QuantitySold]) VALUES (34, 9, 15, 4, 7, N'Không Gia Đình
', 31, N'"Không Gia Đình là cuốn sách được xếp vào danh mục văn học thiếu nhi nhưng rõ ràng, với những gì Không Gia Đình đã kể thì đây là cuốn sách dành cho mọi lứa tuổi ở mọi quốc gia, mọi tầng lớp.

Không Gia Đình là một chuyến phiêu lưu mà Rêmi là nhân vật chính. Em nghèo khổ, em cô độc, em không có người thân. Cuộc đời Rêmi gắn liền với gánh xiếc rong, với những thử thách mà em gặp phải trên đường đời trải rộng khắp nước Pháp tươi đẹp. Rêmi lớn lên trong đau khổ, lang thang mọi nơi, bị tù đày... nhưng dù trong hoàn cảnh nào, em vẫn đứng thẳng lưng, ngẩng cao đầu, giữ phẩm chất làm người - điều em đã học từ cụ Vitali trong cuộc đời lang bạt của mình.

Không Gia Đình ca ngợi giá trị của lao động, của nhân cách và tình cảm. Cuốn sách mô tả những hình ảnh, những mảnh đời bấp bênh để làm nền cho niềm tin, cho tình người ấm áp.

Không Gia Đình thực sự là một cuốn sách hay và giá trị hơn cả một giá sách dạy phương pháp làm người.


Không gia đình kể chuyện một em bé không cha mẹ, không họ hàng thân thích, đi theo một đoàn xiếc chó, khỉ, rồi cầm đầu đoàn ấy đi lưu lạc khắp nước Pháp, sau đó bị tù ở Anh, cuối cùng tìm thấy mẹ và em. Em bé Rêmi ấy đã lớn lên trong gian khổ. Em đã chung đụng với mọi hạng người, sống khắp mọi nơi, ""nơi thì lừa đảo, nơi thì xót thương"". Em đã lao động mà sống, lúc đầu dưới quyền điều khiển của một ông già từng trải và đạo đức, cụ Vitali, về sau thì tự lập và không những lo cho mình, còn bảo đảm việc biểu diễn và sinh sống cho cả một gánh hát rong. Đã có khi em và cả đoàn lang thang mấy hôm liền không có chút gì trong bụng. Đã có khi em suýt chết rét. Đã có khi em bị lụt ngầm chôn trong giếng mỏ mười mấy ngày đêm. Đã có khi em mắc oan bị giải ra trước tòa và bị ở tù.

Và cũng có khi em được nuôi nấng đàng hoàng, no ấm. Nhưng dù ở đâu, trong cảnh ngộ nào, em vẫn noi theo nếp rèn dạy của ông già Vitali giữ phẩm chất làm người, nghĩa là ngay thẳng, gan dạ, tự trọng, thương người, ham lao động, không ngửa tay xin xỏ, không dối trá, gian giảo, nhớ ơn nghĩa, luôn luôn muốn làm người có ích...

(nội dung sản phẩm không thay đổi / hình ảnh bìa thay đổi theo từng đợt nhập hàng)

Giá sản phẩm trên Tiki đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như phí vận chuyển, phụ phí hàng cồng kềnh, thuế nhập khẩu (đối với đơn hàng giao từ nước ngoài có giá trị trên 1 triệu đồng)....."
', 151150, 5, 1, CAST(N'2024-01-01 00:00:00.0000000' AS DateTime2), 0)
INSERT [dbo].[Books] ([Id], [PublisherId], [AuthorId], [CategoryId], [PromotionId], [Name], [Quantity], [Description], [Price], [Star], [Status], [CreateTime], [QuantitySold]) VALUES (35, 10, 16, 1, 7, N'Nhà Giả Kim
', 20, N'"Tất cả những trải nghiệm trong chuyến phiêu du theo đuổi vận mệnh của mình đã giúp Santiago thấu hiểu được ý nghĩa sâu xa nhất của hạnh phúc, hòa hợp với vũ trụ và con người.

Tiểu thuyết Nhà giả kim của Paulo Coelho như một câu chuyện cổ tích giản dị, nhân ái, giàu chất thơ, thấm đẫm những minh triết huyền bí của phương Đông. Trong lần xuất bản đầu tiên tại Brazil vào năm 1988, sách chỉ bán được 900 bản. Nhưng, với số phận đặc biệt của cuốn sách dành cho toàn nhân loại, vượt ra ngoài biên giới quốc gia, Nhà giả kim đã làm rung động hàng triệu tâm hồn, trở thành một trong những cuốn sách bán chạy nhất mọi thời đại, và có thể làm thay đổi cuộc đời người đọc.

“Nhưng nhà luyện kim đan không quan tâm mấy đến những điều ấy. Ông đã từng thấy nhiều người đến rồi đi, trong khi ốc đảo và sa mạc vẫn là ốc đảo và sa mạc. Ông đã thấy vua chúa và kẻ ăn xin đi qua biển cát này, cái biển cát thường xuyên thay hình đổi dạng vì gió thổi nhưng vẫn mãi mãi là biển cát mà ông đã biết từ thuở nhỏ. Tuy vậy, tự đáy lòng mình, ông không thể không cảm thấy vui trước hạnh phúc của mỗi người lữ khách, sau bao ngày chỉ có cát vàng với trời xanh nay được thấy chà là xanh tươi hiện ra trước mắt. ‘Có thể Thượng đế tạo ra sa mạc chỉ để cho con người biết quý trọng cây chà là,’ ông nghĩ.”

- Trích Nhà giả kim

Giá sản phẩm trên Tiki đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như phí vận chuyển, phụ phí hàng cồng kềnh, thuế nhập khẩu (đối với đơn hàng giao từ nước ngoài có giá trị trên 1 triệu đồng)..."
', 69000, 5, 1, CAST(N'2024-01-01 00:00:00.0000000' AS DateTime2), 0)
INSERT [dbo].[Books] ([Id], [PublisherId], [AuthorId], [CategoryId], [PromotionId], [Name], [Quantity], [Description], [Price], [Star], [Status], [CreateTime], [QuantitySold]) VALUES (36, 11, 17, 4, 9, N'Những Đứa Trẻ Không Bao Giờ Lớn 
', 45, N'"NHỮNG ĐỨA TRẺ KHÔNG BAO GIỜ LỚN” - DƯƠNG MINH TUẤN

“Tôi muốn quay ngược thời gian và trở lại tuổi thơ.

Khi “Bố” là “Anh hùng và “Tình yêu” là “Cái ôm của mẹ”.

“Nơi cao nhất trên thế giới này” là “Bờ vai của bố”.

Điều duy nhất có thể gây “đau đớn” là “Xước đầu gối”.

Thứ duy nhất “Vỡ vụn” là “Đồ chơi”. Và

“Tạm biệt” có nghĩa là “ Hẹn gặp lại vào ngày mai”.

Cách đây 3 năm, khi mới phát hành, đoạn văn trích trong cuốn ""Những đứa trẻ không bao giờ lớn"" đã trở thành hot trend, được rất nhiều độc giả chia sẻ. Cuốn sách năm ấy cũng trở thành hiện tượng, lọt bảng xếp hạng của rất nhiều trang bán sách.
Lần này, Những đứa trẻ không bao giờ lớn trở lại với bạn đọc với diện mạo trưởng thành hơn, chín chắn hơn, chắc chắn sẽ mang lại một cảm xúc mới cho những ai từng yêu mến cuốn sách và tác giả Dương Minh Tuấn.

Xin trích lại một review vô cùng chân thật và đầy đủ của một bạn đọc để mọi người có cái nhìn khác về cuốn sách ý nghĩa này:
""Cuốn sách Những đứa trẻ không bao giờ lớn mở đầu với lời đề từ đầy chiêm nghiệm, có lẽ sẽ không khó đoán, màu sắc trầm mặc lạnh lẽo của cô đơn, của thương nhớ, của đắng cay… sẽ bao trùm lên từng trang từng trang của cuốn sách này.

Lần đầu tiên mình thấy một cuốn tản văn Việt Nam mà người viết không phải nhà văn, mà là Bác Sĩ. Nghe là đã thấy nhiều câu chuyện rồi. Và đúng như vậy thật, một nhà văn sẽ kể cho cậu nghe những cuộc đời, nhưng một anh bác sĩ sẽ kể cho cậu nghe rất nhiều những cuộc đời trong Bệnh Viện. Mà bênh viện thì,… mọi người biết rồi đấy!
"
', 76800, 5, 1, CAST(N'2024-01-01 00:00:00.0000000' AS DateTime2), 0)
INSERT [dbo].[Books] ([Id], [PublisherId], [AuthorId], [CategoryId], [PromotionId], [Name], [Quantity], [Description], [Price], [Star], [Status], [CreateTime], [QuantitySold]) VALUES (37, 3, 4, 4, 9, N'Sự Im Lặng Của Bầy Cừu 
', 37, N'"Khi nhắc đến“Sự Im Lặng Của Bầy Cừu” hiển nhiên bất cứ một ai đã đọc trọn bộ tác phẩm của nhà văn Thomas Harris đều sẽ nghĩ ngay đến vị bác sĩ ăn thịt người Hannibal Lecter. Rất thán phục Thomas Harris khi xây dựng hình tượng vị bác sĩ bị tâm thần hay vốn dĩ không phải con người. Kiến thức sâu rộng trong tâm thần học đã khiến cho tên sát nhân này điều khiển tâm trí con mồi, sau đó giết chết và cuối cùng là ăn thịt họ chỉ vị mục đích giải trí không hơn không kém. Những trang viết quá ám ảnh nên sẽ luôn là cuốn sách đáng để bạn phải có nếu bạn là fan của thể loại kinh dị, trinh thám..

Nội dung của quyểntiểu thuyết trinh thám này kể về những vụ án giết người hàng loạt nhưng không để lại dấu vết. Nhưng sự kì là là sự im lặng của Lecter- một bác sĩ tâm lí bị tâm thần biết rõ mọi hành vi của tên sát nhân. Sự im lặng chỉ kết thúc khi những cuộc đối đầu đi đến cực điểm. Những cuộc phỏng vấn qua xà lim với kẻ sát nhân ăn thịt người ham thích trò chơi trí tuệ, những tiết lộ nửa chừng chỉ dành cho kẻ nào thông minh, những cái nhìn xuyên thấu thân phận. Trong sự bức bối của tiếng đồng hồ đếm ngược, nữ thực tập sinh FBI phải vật lộn để chấm dứt tiếng kêu bấy lâu : ""tiếng kêu của bầy cừu sắp bị đem đi giết thịt""."
', 92000, 5, 1, CAST(N'2024-01-01 00:00:00.0000000' AS DateTime2), 0)
INSERT [dbo].[Books] ([Id], [PublisherId], [AuthorId], [CategoryId], [PromotionId], [Name], [Quantity], [Description], [Price], [Star], [Status], [CreateTime], [QuantitySold]) VALUES (38, 2, 18, 4, 7, N'Suối nguồn
', 54, N'"ác phẩm đứng đầu bảng xếp hạng những tiểu thuyết hay nhất thế kỷ 20 do độc giả bình chọn (theo điều tra của New York Time)

Đã bán được 6 triệu bản trong hơn 60 năm qua kể từ khi xuất bản lần đầu (năm 1943).

Được dịch ra nhiều thứ tiếng và vẫn liên tục được tái bản hàng năm.

Một tiểu thuyết kinh điển cần đọc nay đã có mặt tại Việt Nam với bản dịch tiếng Việt.

""Một tiểu thuyết tràn đầy sức sống và sự thú vị … mạnh mẽ, kịch tính, mãnh liệt và rành mạch từ đầu đến cuối … một tác phẩm tuyệt vời đáng để đọc.”

Saturday Review of Literature

“Tôi có thể ca ngợi tiểu thuyết này ở nhiều khía cạnh… sự kiện hấp dẫn…những nhân vật đầy màu sắc… táo bạo… thông minh phi thường.” - New York Herald Tribune"
', 290500, 5, 1, CAST(N'2024-01-01 00:00:00.0000000' AS DateTime2), 0)
INSERT [dbo].[Books] ([Id], [PublisherId], [AuthorId], [CategoryId], [PromotionId], [Name], [Quantity], [Description], [Price], [Star], [Status], [CreateTime], [QuantitySold]) VALUES (39, 10, 19, 4, 7, N'Không Gia Đình
', 65, N'"Không gia đình kể chuyện một em bé không cha mẹ, không họ hàng thân thích, đi theo một đoàn xiếc chó, khỉ, rồi cầm đầu đoàn ấy đi lưu lạc khắp nước Pháp, 
sau đó bị tù ở Anh, cuối cùng tìm thấy mẹ và em. Em bé Rémi ấy đã lớn lên trong gian khổ. Em đã chung đụng với mọi hạng người, sống khắp mọi nơi,
 “nơi thì lừa đảo, nơi thì xót thương”. Em đã lao động mà sống, lúc đầu dưới quyền điều khiển của một ông già từng trải và đạo đức, cụ Vitalis, 
về sau thì tự lập và không những lo cho mình mà còn bảo đảm việc biểu diễn và sinh sống cho cả một gánh hát rong. 
Đã có khi em và cả đoàn lang thang mấy hôm liền không có chút gì trong bụng. Đã có khi em suýt chết rét. 
Đã có khi em bị lụt ngầm chôn trong giếng mỏ mười mấy ngày đêm. Đã có khi em mắc oan bị giải ra trước tòa án và bị bỏ tù. 
Và cũng có khi em được nuôi nấng đàng hoàng, no ấm. Nhưng dù ở đâu, trong cảnh ngộ nào, em vẫn noi theo nếp rèn dạy của ông già Vitalis giữ phẩm chất làm người, 
nghĩa là ngay thẳng, gan dạ, tự trọng, thương người, ham lao động, không ngửa tay xin xỏ, không dối trá, gian giảo, nhớ ơn nghĩa, luôn luôn muốn làm người có ích."
', 178500, 5, 1, CAST(N'2024-01-01 00:00:00.0000000' AS DateTime2), 0)
SET IDENTITY_INSERT [dbo].[Books] OFF
SET IDENTITY_INSERT [dbo].[Images] ON 

INSERT [dbo].[Images] ([Id], [BookId], [FileName], [FilePDF]) VALUES (1, 12, N'CB_NGK_HTVPD.jpg', NULL)
INSERT [dbo].[Images] ([Id], [BookId], [FileName], [FilePDF]) VALUES (2, 13, N'CB_DNDND_3NTVD.png', NULL)
INSERT [dbo].[Images] ([Id], [BookId], [FileName], [FilePDF]) VALUES (3, 14, N'CB_RNY_YNDKHH.png', NULL)
INSERT [dbo].[Images] ([Id], [BookId], [FileName], [FilePDF]) VALUES (4, 21, N'CB_Hannibal_SILCBC.png', NULL)
INSERT [dbo].[Images] ([Id], [BookId], [FileName], [FilePDF]) VALUES (5, 23, N'CB_BTDX_GCCN.png', NULL)
INSERT [dbo].[Images] ([Id], [BookId], [FileName], [FilePDF]) VALUES (6, 24, N'CB_BCLGTGVV_LTCBCTDPSS.png', NULL)
INSERT [dbo].[Images] ([Id], [BookId], [FileName], [FilePDF]) VALUES (7, 25, N'CB_TCM_TND.png', NULL)
INSERT [dbo].[Images] ([Id], [BookId], [FileName], [FilePDF]) VALUES (8, 26, N'CB_NDTLTP_PTCBTTP.png', NULL)
INSERT [dbo].[Images] ([Id], [BookId], [FileName], [FilePDF]) VALUES (9, 27, N'CB_YC_YCW.png', NULL)
INSERT [dbo].[Images] ([Id], [BookId], [FileName], [FilePDF]) VALUES (10, 28, N'CayCamNgotCuaToi.jpg', NULL)
INSERT [dbo].[Images] ([Id], [BookId], [FileName], [FilePDF]) VALUES (11, 30, N'NguoiTruyenKyUc.jpg', NULL)
INSERT [dbo].[Images] ([Id], [BookId], [FileName], [FilePDF]) VALUES (12, 31, N'NhuMotCuonTieuThuyet.jpg', NULL)
INSERT [dbo].[Images] ([Id], [BookId], [FileName], [FilePDF]) VALUES (13, 32, N'HaiSoPhan.jpg', NULL)
INSERT [dbo].[Images] ([Id], [BookId], [FileName], [FilePDF]) VALUES (14, 33, N'OngGiaVaBienCa.jpg', NULL)
INSERT [dbo].[Images] ([Id], [BookId], [FileName], [FilePDF]) VALUES (15, 34, N'KhongGiaDinh.jpg', NULL)
INSERT [dbo].[Images] ([Id], [BookId], [FileName], [FilePDF]) VALUES (16, 35, N'NhaGiaKim.jpg', NULL)
INSERT [dbo].[Images] ([Id], [BookId], [FileName], [FilePDF]) VALUES (17, 36, N'NhungDuaTreKhongBaoGioLon.jpg', NULL)
INSERT [dbo].[Images] ([Id], [BookId], [FileName], [FilePDF]) VALUES (18, 37, N'SuImLangCuaBayCuu.jpg', NULL)
INSERT [dbo].[Images] ([Id], [BookId], [FileName], [FilePDF]) VALUES (19, 38, N'SuoiNguon.jpg', NULL)
INSERT [dbo].[Images] ([Id], [BookId], [FileName], [FilePDF]) VALUES (22, 39, N'KhongGiaDinh1.jpg', NULL)
SET IDENTITY_INSERT [dbo].[Images] OFF
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20240114081344_dbBookStore', N'6.0.25')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20240126162919_Init1', N'6.0.25')

/**
 * 客户管理
 * 
 * @author XiongChun
 * @since 2010-04-20
 */
Ext
		.onReady(function() {
			var root = new Ext.tree.AsyncTreeNode({
				text : root_deptname,
				expanded : true,
				id : root_deptid
			});
			var deptTree = new Ext.tree.TreePanel({
				loader : new Ext.tree.TreeLoader({
					baseAttrs : {},
					dataUrl : './customer.ered?reqCode=departmentTreeInit'
				}),
				root : root,
				title : '',
				applyTo : 'deptTreeDiv',
				autoScroll : false,
				animate : false,
				useArrows : false,
				border : false
			});
			deptTree.root.select();
			deptTree.on('click', function(node) {
				var name='';
                var ifRecycled='';
				var owner="";
				var linkname='';
				
			    name=Ext.getCmp('gname').getValue();
			    ifRecycled=Ext.getCmp('ifRecycled').getValue();
			    owner=Ext.getCmp('owner').getValue();
			    linkname=Ext.getCmp('glinkname').getValue();

				
				deptid = node.attributes.id;
				store.load({
					params : {
						start : 0,
						limit : bbar.pageSize,
						deptid : deptid,
						name:name,
						ifRecycled:ifRecycled,
						owner:owner,
						linkname:linkname
					}
				});
			});
			
			
            
			var sm = new Ext.grid.CheckboxSelectionModel();
			var cm = new Ext.grid.ColumnModel(
					[
							new Ext.grid.RowNumberer(),
							sm,
							{
								
								header : '记录',
								dataIndex : 'id',
								renderer : function(value, cellmeta, record) {
									return '<a href="javascript:void(0);"><img src="../resource/image/ext/comments2.png"/></a>';
								},
								width : 40
							},
							{
								header : '公司id',
								dataIndex : 'id',
								hidden:true
							},
							{
								header : '公司名称',
								dataIndex : 'name',
								width : 80
							}, 
							{
								header : '公司地址',
								dataIndex : 'addr',
								width : 130
							},
							{
								header : '客户性质',
								dataIndex : 'status',
								hidden:true
							},
							{
								header : '回收状态',
								dataIndex : 'deleted',
								width : 130,
								renderer:function (value,cellMetaData,record)
								         {
									          return value=2?"已分配":"待分配";
								         }
							},
							
							{
								header : '联系人',
								dataIndex : 'linkname',
								width : 130
							}, {
								header : '电话',
								dataIndex : 'tel',
								width : 130
							}, 
							 {
								header : '手机',
								dataIndex : 'phone',
								width : 130
							},
							{
								header : '传真',
								dataIndex : 'phone',
								width : 130
							},
							{
								header : 'Email',
								dataIndex : 'email',
								width : 130
							},
							{
								header : '部门编号',
								dataIndex : 'deptid',
								hidden:true
							},
							{
								header : '所属部门',
								dataIndex : 'deptname',
								width : 130
							},
							{
								header : '所属员工',
								dataIndex : 'ownername',
								width : 130
							},
							{
								id : 'remark',
								header : '备注',
								dataIndex : 'remark'
							}]);

			/**
			 * 数据存储
			 */
			var store = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
					url : './customer.ered?reqCode=queryCustomerForManage'
				}),
				reader : new Ext.data.JsonReader({
					totalProperty : 'TOTALCOUNT',
					root : 'ROOT'
				}, [ {
					name : 'id'
				}, {
					name : 'name'
				}, {
					name : 'linkname'
				}, {
					name : 'tel'
				}, {
					name : 'phone'
				}, {
					name : 'fax'
				}, {
					name : 'email'
				}, {
					name : 'addr'
				}, {
					name : 'deptname'
				},
				{
					name : 'deptid'
				}, 
				{
					name : 'ownerid'
				},
				{
					name : 'ownername'
				}, 
				{
					name : 'status'
				},
				{
					name : 'deleted'
				},
				{
					lastcalltime : 'lastcalltime'
				},
				{
					name : 'statusname'
				}, 
				{
					name : 'remark'
				} ])
			});

			// 翻页排序时带上查询条件
			store.on('beforeload', function() {
				//variables
				var name='';
                var ifRecycled='';
				var owner="";
				var linkname='';
				
			    name=Ext.getCmp('gname').getValue();
			    ifRecycled=Ext.getCmp('ifRecycled').getValue();
			    owner=Ext.getCmp('owner').getValue();
			    linkname=Ext.getCmp('glinkname').getValue();

				this.baseParams = {
					name:name,ifRecycled:ifRecycled,owner:owner,linkname:linkname
				};
			});
			var pagesize_combo = new Ext.form.ComboBox({
				name : 'pagesize',
				hiddenName : 'pagesize',
				typeAhead : true,
				triggerAction : 'all',
				lazyRender : true,
				mode : 'local',
				store : new Ext.data.ArrayStore({
					fields : [ 'value', 'text' ],
					data : [ [ 10, '10条/页' ], [ 20, '20条/页' ], [ 50, '50条/页' ],
							[ 100, '100条/页' ], [ 250, '250条/页' ],
							[ 500, '500条/页' ] ]
				}),
				valueField : 'value',
				displayField : 'text',
				value : '50',
				editable : false,
				width : 85
			});
			var number = parseInt(pagesize_combo.getValue());
			pagesize_combo.on("select", function(comboBox) {
				bbar.pageSize = parseInt(comboBox.getValue());
				number = parseInt(comboBox.getValue());
				//
				
				var name='';
                var ifRecycled='';
				var owner="";
				var linkname='';
				
			    name=Ext.getCmp('gname').getValue();
			    ifRecycled=Ext.getCmp('ifRecycled').getValue();
			    owner=Ext.getCmp('owner').getValue();
			    linkname=Ext.getCmp('glinkname').getValue();
				store.load({
					params : {
						start : 0,
						limit : bbar.pageSize,
						name:name,
						ifRecycled:ifRecycled,
						owner:owner,
						linkname:linkname
					}
				});
			});

			var bbar = new Ext.PagingToolbar({
				pageSize : number,
				store : store,
				displayInfo : true,
				displayMsg : '显示{0}条到{1}条,共{2}条',
				emptyMsg : "没有符合条件的记录",
				items : [ '-', '&nbsp;&nbsp;', pagesize_combo ]
			});
			var grid = new Ext.grid.GridPanel({
				title : '<span style="font-weight:normal">客户信息表</span>',
				iconCls : 'groupIcon',
				renderTo : 'userGridDiv',
				height : 500,
				// width:600,
				autoScroll : true,
				region : 'center',
				store : store,
				loadMask : {
					msg : '正在加载表格数据,请稍等...'
				},
				stripeRows : true,
				frame : true,
				autoExpandColumn : 'remark',
				cm : cm,
				sm : sm,
				tbar : [ {
					text : '新增',
					iconCls : 'page_addIcon',
					handler : function() {
						addInit();
					}
				}, '-', {
					text : '修改',
					iconCls : 'page_edit_1Icon',
					handler : function() {
						editInit();
					}
				}, '-', {
					text : '删除',
					iconCls : 'page_delIcon',
					handler : function() {
						deleteCustomerItems();
					}
				}, '-', {
					text : '分配',
					iconCls : 'page_addIcon',
					handler : function() {
						disCustsToEmps();
					}
				}, '->',
				 //Query customers conditions
				 new Ext.form.TextField({
						id : 'gname',
						name : 'name',
						emptyText : '客户名称...',
						enableKeyEvents : true,
						listeners : {
							specialkey : function(field, e) {
								if (e.getKey() == Ext.EventObject.ENTER) {
									queryCustomersByConditons();
								}
							}
						},
						width : 75
					}),
					"-",
					new Ext.form.ComboBox({
						id:'ifRecycled',
						hiddenName : 'ifRecycledName', 
						store : new Ext.data.SimpleStore({
							fields : ['text', 'value'],
							data : [['未回收', '0'],['已回收', '-2']]
						}),
						mode : 'local',
						triggerAction : 'all',
						valueField : 'value',
						displayField : 'text',
						value : '', // 初始选中的列表项
						fieldLabel : '时间间隔',
						emptyText : '回收状态...',
						allowBlank : true,
						//forceSelection : true, // 选中内容必须为下拉列表的子项
						editable : true, // 选择输入框可编辑
						typeAhead : true, // 输入的时候自动匹配待选项目
						anchor : '100%',
						width : 75,
						bodyStyle : 'padding:5 5 0'
					}), 
					"-",
					 new Ext.form.TextField({
							id : 'owner',
							name : 'ownername',
							emptyText : '所属员工...',
							enableKeyEvents : true,
							listeners : {
								specialkey : function(field, e) {
									if (e.getKey() == Ext.EventObject.ENTER) {
										queryCustomersByConditons();
									}
								}
							},
							width : 75
						}),
						"-",
							 new Ext.form.TextField({
									id : 'glinkname',
									name : 'linkname',
									emptyText : '联系人...',
									enableKeyEvents : true,
									listeners : {
										specialkey : function(field, e) {
											if (e.getKey() == Ext.EventObject.ENTER) {
												queryCustomersByConditons();
											}
										}
									},
									width : 75
								}),
					  "-",
								 new Ext.form.TextField({
										id : 'custid',
										hidden:true
									}),
					  "-",
					{
					text : '查询',
					iconCls : 'previewIcon',
					handler : function() {
						queryCustomersByConditons();
					}
				}, '-', {
					text : '刷新',
					iconCls : 'arrow_refreshIcon',
					handler : function() {
						store.reload();
					}
				} ],
				bbar : bbar
			});
			store.load({
				params : {
					start : 0,
					limit : bbar.pageSize,
					firstload : 'true'
				}
			});
			grid.on('rowdblclick', function(grid, rowIndex, event) {
				editInit();
			});
			grid.on('sortchange', function() {
				// grid.getSelectionModel().selectFirstRow();
			});
			grid.on("cellclick",
					function(grid, rowIndex, columnIndex, e) {
						  if (columnIndex == 2) {
							  var store = grid.getStore();
							  var record = store.getAt(rowIndex);
							  var custid=record.get('id');
							  Ext.getCmp("custid").setValue(custid);
							  reStore.load({
									params : {
										start : 0,
										limit : reBbar.pageSize,
										firstload : 'true',
										custid:Ext.getCmp("custid").getValue()
									}
								});
							  recordsWindow.show();
					       }


						  
						 
					});

			bbar.on("change", function() {
				// grid.getSelectionModel().selectFirstRow();
			});

			var addRoot = new Ext.tree.AsyncTreeNode({
				text : root_deptname,
				expanded : true,
				id : root_deptid
			});
			
		
			
			var addDeptTree = new Ext.tree.TreePanel({
				loader : new Ext.tree.TreeLoader({
					baseAttrs : {},
					dataUrl : './customer.ered?reqCode=departmentTreeInit'
				}),
				root : addRoot,
				autoScroll : true,
				animate : false,
				useArrows : false,
				border : false
			});
			// 监听下拉树的节点单击事件
			addDeptTree.on('click', function(node) {
				comboxWithTree.setValue(node.text);
				Ext.getCmp("addCustomerFormPanel").findById('deptid').setValue(
						node.attributes.id);
				comboxWithTree.collapse();
				//TODO:add click event
				var deptid=node.attributes.id;
				userCombo.reset();
				userStore.load({
							params : {
								deptid : deptid
							}
						});
			});
			
			
			
			
			
			var comboxWithTree = new Ext.form.ComboBox(
					{
						id : 'deptname',
						store : new Ext.data.SimpleStore({
							fields : [],
							data : [ [] ]
						}),
						editable : false,
						value : ' ',
						emptyText : '请选择...',
						fieldLabel : '分配给部门',
						anchor : '100%',
						mode : 'local',
						triggerAction : 'all',
						maxHeight : 390,
						// 下拉框的显示模板,addDeptTreeDiv作为显示下拉树的容器
						tpl : "<tpl for='.'><div style='height:390px'><div id='addDeptTreeDiv'></div></div></tpl>",
						allowBlank : false,
						onSelect : Ext.emptyFn
					});
				// 监听下拉框的下拉展开事件
				comboxWithTree.on('expand', function() {
				// 将UI树挂到treeDiv容器
				addDeptTree.render('addDeptTreeDiv');
				// addDeptTree.root.expand(); //只是第一次下拉会加载数据
				addDeptTree.root.reload(); // 每次下拉都会加载数据
				//Ext.MessageBox.alert('提示', '人员数据保存失败:<br>');
			});
			
			
				var userStore = new Ext.data.Store({
					proxy : new Ext.data.HttpProxy({
								url : './customer.ered?reqCode=cascadeUserFromDepartment'
							}),
					reader : new Ext.data.JsonReader({}, [{
										name : 'userid'
									}, {
										name : 'username'
									}]),
					baseParams : {
						areacodelength : '4'
					},
					listeners:{
						load:function()
						{
							userCombo.setValue(userCombo.getValue());  
						}
					}
				});
			
			
			

			
			var statusCombo = new Ext.form.ComboBox({
				hiddenName : 'status', // 往后台传值字段名
				store : CUSTOMER_STATUSStore, // 引用的代码表数据源和<eRedG4:ext.codeStore
										// />标签对应
				mode : 'local',
				triggerAction : 'all',
				valueField : 'value',
				displayField : 'text',
				value : '', // 初始选中的列表项
				fieldLabel : '客户性质',
				emptyText : '请选择...',
				allowBlank : false,
				forceSelection : true, // 选中内容必须为下拉列表的子项
				editable : true, // 选择输入框可编辑
				typeAhead : true, // 输入的时候自动匹配待选项目
				anchor : '100%'
			});
			

			var userCombo = new Ext.form.ComboBox({
				hiddenName : 'ownerid',
				fieldLabel : '分配给员工',
				emptyText : '请选择员工...',
				triggerAction : 'all',
				store : userStore,
				displayField : 'username',
				valueField : 'userid',
				loadingText : '正在加载数据...',
				mode : 'local', // 数据会自动读取,如果设置为local又调用了store.load()则会读取2次；也可以将其设置为local，然后通过store.load()方法来读取
				forceSelection : true,
				typeAhead : true,
				resizable : true,
				editable : false,
				anchor : '100%'
				
			});
			userCombo.on('select', function() {
				Ext.getCmp("addCustomerFormPanel").findById('sgusrid').setValue(userCombo.getValue());//第一次分给谁，谁就是提供者
			});
			
			
			var addCustomerFormPanel = new Ext.form.FormPanel({
				id : 'addCustomerFormPanel',
				name : 'addCustomerFormPanel',
				defaultType : 'textfield',
				labelAlign : 'right',
				labelWidth : 65,
				frame : false,
				bodyStyle : 'padding:5 5 0',
				items : [ {
					name : 'id',
					id : 'id',
					hidden:true
				},{
					fieldLabel : '公司名称',
					name : 'name',
					id : 'name',
					allowBlank : false,
					anchor : '99%'
				},
				statusCombo,
				comboxWithTree,
				userCombo,
				{
					fieldLabel : '联系人',
					name : 'linkname',
					id : 'linkname',
					allowBlank : false,
					anchor : '99%'
				}, 
				{
					fieldLabel : '电话',
					name : 'tel',
					id : 'tel',
					allowBlank : true,
					anchor : '99%'
				}, {
					fieldLabel : '手机',
					name : 'phone',
					id : 'phone',
					allowBlank : true,
					anchor : '99%'
				}, {
					fieldLabel : '传真',
					name : 'fax',
					id : 'fax',
					allowBlank : true,
					anchor : '99%'
				}, 
				{
					fieldLabel : 'EMAIL',
					name : 'email',
					id : 'email',
					allowBlank : true,
					anchor : '99%'
				},
				{
					fieldLabel : '公司地址',
					name : 'addr',
					id : 'addr',
					allowBlank : true,
					anchor : '99%'
				},
				
				{
					fieldLabel : '备注',
					name : 'remark',
					allowBlank : true,
					anchor : '99%'
				},
				{
					id : 'deptid',
					name : 'deptid',
					hidden : true
				}, {
					id : 'deptid_old',
					name : 'deptid_old',
					hidden : true
				}, {
					id : 'ownerid',
					name : 'ownerid',
					hidden : true
				}, 
				{
					id : 'sgusrid',
					name : 'sgusrid',
					hidden : true
				},
				{
					id : 'windowmode',
					name : 'windowmode',
					hidden : true
				}, 
				{
					id : 'updatemode',
					name : 'updatemode',
					hidden : true
				} ]
			});

			var addCustomerWindow = new Ext.Window(
					{
						layout : 'fit',
						width : 400,
						height : 410,
						resizable : false,
						draggable : true,
						closeAction : 'hide',
						modal : true,
						title : '<span style="font-weight:normal">新增客户</span>',
						// iconCls : 'page_addIcon',
						collapsible : true,
						titleCollapse : true,
						maximizable : false,
						buttonAlign : 'right',
						border : false,
						animCollapse : true,
						pageY : 20,
						pageX : document.body.clientWidth / 2 - 420 / 2,
						animateTarget : Ext.getBody(),
						constrain : true,
						items : [ addCustomerFormPanel ],
						buttons : [
								{
									text : '保存',
									iconCls : 'acceptIcon',
									handler : function() {
										if (runMode == '0') {
											Ext.Msg
													.alert('提示',
															'系统正处于演示模式下运行,您的操作被取消!该模式下只能进行查询操作!');
											return;
										}
										var mode = Ext.getCmp('windowmode')
												.getValue();
										if (mode == 'add')
											saveCustomerItem();
										else
											updateCustomerItem();
									}
								}, {
									text : '重置',
									id : 'btnReset',
									iconCls : 'tbar_synchronizeIcon',
									handler : function() {
										clearForm(addCustomerFormPanel.getForm());
									}
								}, {
									text : '关闭',
									iconCls : 'deleteIcon',
									handler : function() {
										addCustomerWindow.hide();
									}
								} ]
					});

			/**
			 * 布局
			 */
			var viewport = new Ext.Viewport({
				layout : 'border',
				items : [ {
					title : '<span style="font-weight:normal">组织机构</span>',
					iconCls : 'chart_organisationIcon',
					tools : [ {
						id : 'refresh',
						handler : function() {
							deptTree.root.reload()
						}
					} ],
					collapsible : true,
					width : 210,
					minSize : 160,
					maxSize : 280,
					split : true,
					region : 'west',
					autoScroll : true,
					// collapseMode:'mini',
					items : [ deptTree ]
				}, {
					region : 'center',
					layout : 'fit',
					items : [ grid ]
				} ]
			});

			

			/**
			 * 新增人员初始化
			 */
			function addInit() {
//				if (login_account == parent.DEFAULT_DEVELOP_ACCOUNT) {
//					usertypeCombo.setReadOnly(false);
//				}
//				if (login_account == parent.DEFAULT_ADMIN_ACCOUNT) {
//					usertypeCombo.setReadOnly(false);
//				}
				// clearForm(addCustomerFormPanel.getForm());
				var flag = Ext.getCmp('windowmode').getValue();
				if (typeof (flag) != 'undefined') {
					addCustomerFormPanel.form.getEl().dom.reset();
				} else {
					clearForm(addCustomerFormPanel.getForm());
				}
				var selectModel = deptTree.getSelectionModel();
				var selectNode = selectModel.getSelectedNode();
				Ext.getCmp('deptname').setValue(selectNode.attributes.text);
				Ext.getCmp('deptid').setValue(selectNode.attributes.id);
				//ToDo:intilize the usercombox
				var deptid=selectNode.attributes.id;
				userCombo.reset();
				userStore.load({
							params : {
								deptid : deptid
							}
						});
				//
				addCustomerWindow.show();
				addCustomerWindow
						.setTitle('<span style="font-weight:normal">新增客户</span>');
				Ext.getCmp('windowmode').setValue('add');
				comboxWithTree.setDisabled(false);
				Ext.getCmp('btnReset').show();
			}

			/**
			 * 保存人员数据
			 */
			function saveCustomerItem() {
				if (!addCustomerFormPanel.form.isValid()) {
					return;
				}
				addCustomerFormPanel.form.submit({
					url : './customer.ered?reqCode=saveCustomerItem',
					waitTitle : '提示',
					method : 'POST',
					waitMsg : '正在处理数据,请稍候...',
					success : function(form, action) {
						addCustomerWindow.hide();
						store.reload();
						form.reset();
						Ext.MessageBox.alert('提示', action.result.msg);
					},
					failure : function(form, action) {
						var msg = action.result.msg;
						Ext.MessageBox.alert('提示', '人员数据保存失败:<br>' + msg);
					}
				});
			}

			/**
			 * 删除人员
			 */
			function deleteCustomerItems() {
				var rows = grid.getSelectionModel().getSelections();
				var fields = '';
				for ( var i = 0; i < rows.length; i++) {
					if (rows[i].get('usertype') == '3') {
						fields = fields + rows[i].get('username') + '<br>';
					}
				}
				if (fields != '') {
					Ext.Msg.alert('提示', '<b>您选中的项目中包含如下系统内置的只读项目</b><br>'
							+ fields + '<font color=red>系统内置客户不能删除!</font>');
					return;
				}
				if (Ext.isEmpty(rows)) {
					Ext.Msg.alert('提示', '请先选中要删除的项目!');
					return;
				}
				var strChecked = jsArray2JsString(rows, 'id');
				Ext.Msg
						.confirm(
								'请确认',
								'<span style="color:red"><b>提示:</b>删除人员将同时删除和客户相关的权限信息,请慎重.</span><br>继续删除吗?',
								function(btn, text) {
									if (btn == 'yes') {
										if (runMode == '0') {
											Ext.Msg
													.alert('提示',
															'系统正处于演示模式下运行,您的操作被取消!该模式下只能进行查询操作!');
											return;
										}
										showWaitMsg();
										Ext.Ajax
												.request({
													url : './customer.ered?reqCode=deleteCustomerItems',
													success : function(response) {
														var resultArray = Ext.util.JSON
																.decode(response.responseText);
														store.reload();
														Ext.Msg
																.alert(
																		'提示',
																		resultArray.msg);
													},
													failure : function(response) {
														var resultArray = Ext.util.JSON
																.decode(response.responseText);
														Ext.Msg
																.alert(
																		'提示',
																		resultArray.msg);
													},
													params : {
														strChecked : strChecked
													}
												});
									}
								});
			}

			/**
			 * 修改人员初始化
			 */
			function editInit() {
				var record = grid.getSelectionModel().getSelected();
				if (Ext.isEmpty(record)) {
					Ext.MessageBox.alert('提示', '请先选择要修改的项目!');
				}
				if (record.get('usertype') == '3') {
					Ext.MessageBox.alert('提示', '系统内置人员,不能修改!');
					return;
				}
				addCustomerFormPanel.getForm().loadRecord(record);
				addCustomerWindow.show();
				addCustomerWindow
						.setTitle('<span style="font-weight:normal">修改客户</span>');
				Ext.getCmp('windowmode').setValue('edit');
				Ext.getCmp('deptid_old').setValue(record.get('deptid'));
				//TODO:intilize the statuscombox
				var ownerid=record.get('ownerid')
				//ToDo:intilize the usercombox
				//Ext.MessageBox.alert(oid+"tt");
				var deptid=record.get('deptid');
				
				userCombo.reset();
				userStore.load({
					params : {
						deptid : deptid
					}
				});
				//userCombo.reset();
				
				userCombo.setValue(ownerid);
				
				//
				Ext.getCmp('id').setValue(record.get('id'));
				Ext.getCmp('btnReset').hide();
			}

			/**
			 * 修改人员数据
			 */
			function updateCustomerItem() {
				if (!addCustomerFormPanel.form.isValid()) {
					return;
				}
				var deptid = Ext.getCmp('deptid').getValue();
				var deptid_old = Ext.getCmp('deptid_old').getValue();
				if (deptid != deptid_old) {
					Ext.Msg.confirm('确认',
							'将更新客户所属部门! 继续保存吗?', function(
									btn, text) {
								if (btn == 'yes') {
									update();
								} else {
									return;
								}
							});
					return;
				} else {
					update();
				}
			}

			/**
			 * 更新
			 */
			function update() {
				addCustomerFormPanel.form.submit({
					url : './customer.ered?reqCode=updateCustomerItem',
					waitTitle : '提示',
					method : 'POST',
					waitMsg : '正在处理数据,请稍候...',
					success : function(form, action) {
						addCustomerWindow.hide();
						store.reload();
						form.reset();
						Ext.MessageBox.alert('提示', action.result.msg);
					},
					failure : function(form, action) {
						var msg = action.result.msg;
						Ext.MessageBox.alert('提示', '客户数据修改失败:<br>' + msg);
					}
				});
			}
			
			function queryCustomersByConditons()
			{
				var name='';
                var ifRecycled='';
				var owner="";
				var linkname='';
			
			    name=Ext.getCmp('gname').getValue();
			    ifRecycled=Ext.getCmp('ifRecycled').getValue();
			    owner=Ext.getCmp('owner').getValue();
			    linkname=Ext.getCmp('glinkname').getValue();
				store.load({
					params : {
						start : 0,
						limit : bbar.pageSize,
						name:name,
						ifRecycled:ifRecycled,
						owner:owner,
						linkname:linkname
					}
				});
			}
          //~Form the customer's records history grid====================================================================================
			var reRownum = new Ext.grid.RowNumberer({
				header : 'NO',
				width : 28
			});
			// 定义列模型
			var recm = new Ext.grid.ColumnModel([reRownum, {
				header : '营销人员', // 列标题
				dataIndex : 'username', // 数据索引:和Store模型对应
				sortable : true  // 是否可排序
				},{
					header : '内容',
					dataIndex : 'content',
					sortable : true
				}, {
				header : '联系时间',
				dataIndex : 'calltime',
				sortable : true
			}, {
				header : '提醒时间',
				dataIndex : 'recalltime'
			}]);
			
			/**
			 * 数据存储
			 */
			var reStore = new Ext.data.Store({
						// 获取数据的方式
						proxy : new Ext.data.HttpProxy({
									url : './sales.ered?reqCode=querySalesRecords'
								}),
						reader : new Ext.data.JsonReader({
									totalProperty : 'TOTALCOUNT', // 记录总数
									root : 'ROOT' // Json中的列表数据根节点
								}, [{
											name : 'username' // Json中的属性Key值
										}, {
											name : 'content'
										}, {
											name : 'calltime',
										}, {
											name : 'recalltime'
									}])
					});
					/**
					 * 翻页排序时候的参数传递
					 */
					reStore.on('beforeload', function() {
								var custid=Ext.getCmp("custid").getValue();
								this.baseParams={custid:custid};
							});
				// 每页显示条数下拉选择框
				var rePagesize_combo = new Ext.form.ComboBox({
							name : 'pagesize',
							triggerAction : 'all',
							mode : 'local',
							store : new Ext.data.ArrayStore({
										fields : ['value', 'text'],
										data : [[10, '10条/页'], [20, '20条/页'], [50, '50条/页'], [100, '100条/页'], [250, '250条/页'], [500, '500条/页']]
									}),
							valueField : 'value',
							displayField : 'text',
							value : '20',
							editable : false,
							width : 85
						});
				var reNumber = parseInt(rePagesize_combo.getValue());
				
				// 分页工具栏
				var reBbar = new Ext.PagingToolbar({
							pageSize : reNumber,
							store : reStore,
							displayInfo : true,
							displayMsg : '显示{0}条到{1}条,共{2}条',
							plugins : new Ext.ux.ProgressBarPager(), // 分页进度条
							emptyMsg : "没有符合条件的记录",
							items : ['-', '&nbsp;&nbsp;', rePagesize_combo]
						});
				
				// 改变每页显示条数reload数据
				rePagesize_combo.on("select", function(comboBox) {
							reBbar.pageSize = parseInt(comboBox.getValue());
							reNumber = parseInt(comboBox.getValue());
							reStore.reload({
										params : {
											start : 0,
											limit : reBbar.pageSize
										}
									});
						});
				
			
				// 表格实例
				var salesRecord = new Ext.grid.GridPanel({
							// 表格面板标题,默认为粗体，我不喜欢粗体，这里设置样式将其格式为正常字体
							title : '<span style="font-weight:normal">营销记录</span>',
							height : 300,
							autoScroll : true,
							frame : true,
							region : 'center', // 和VIEWPORT布局模型对应，充当center区域布局
							store : reStore, // 数据存储
							stripeRows : true, // 斑马线
							cm : recm, // 列模型
							//tbar : tbar, // 表格工具栏
							bbar : reBbar,// 分页工具栏
							viewConfig : {
				            // 不产横向生滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
							// forceFit : true
							},
							loadMask : {
								msg : '正在加载表格数据,请稍等...'
							}
						});
				
				//~ Form the records window
					var recordsWindow = new Ext.Window({
						title : '<span style="font-weight:normal">销售记录<span>', // 窗口标题
						layout : 'border', // 设置窗口布局模式
						width : 450, // 窗口宽度
						height : 500, // 窗口高度
						//closable : false, // 是否可关闭
						collapsible : true, // 是否可收缩
						//maximizable : true, // 设置是否可以最大化
						border : false, // 边框线设置
						constrain : true, // 设置窗口是否可以溢出父容器
						animateTarget : Ext.getBody(),
						pageY : 20, // 页面定位Y坐标
						pageX : document.body.clientWidth / 2 - 600 / 2, // 页面定位X坐标
						items : [salesRecord], // 嵌入的表单面板
						close:function(){ 
							    this.hide();
							} 
					});
		      //~Dispath the customers===================================================================================================
				 
				 //Form selected customers panel
				 var selectedCustomersCM = new Ext.grid.ColumnModel([{
						header : 'id', // 列标题
						dataIndex : 'id', // 数据索引:和Store模型对应
					    hidden:true
						},{
							header : '内容',
							dataIndex : 'name',
						}]);
				 var disStore;
				   var selectedGrid = new Ext.grid.GridPanel({
						// 表格面板标题,默认为粗体，我不喜欢粗体，这里设置样式将其格式为正常字体
						title : '<span style="font-weight:normal">已选择客户</span>',
						width:150,
						height : 300,
						autoScroll : true,
						frame : true,
						region : 'west', // 和VIEWPORT布局模型对应，充当center区域布局
						store : disStore, // 数据存储
						stripeRows : true, // 斑马线
						//cm : selectedCustomersCM, // 列模型
						viewConfig : {
			            // 不产横向生滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
						// forceFit : true
						},
						loadMask : {
							msg : '正在加载表格数据,请稍等...'
						}
					});
				 //Form the button
				   var btnPanel = new Ext.Panel({
						id : 'btnPanel',
						name : 'btnPanel',
						title:'操作',  
						width: 30,
						defaultType : 'textfield',
						labelAlign : 'right',
						region: 'center',
						labelWidth : 65,
						frame : false,
						bodyStyle : 'padding:5 5 0,background-color:#FFFFFF,text-align:center',
						buttonAlign: 'center',
						items:new Ext.Button({
								text:"分配",
					            listeners:{
					                "click":function()
							                {
							                	doDispatch();
							                }
					                       }
					                
						})
					});
				 //Form the employee
				   var disAddDeptTree = new Ext.tree.TreePanel({
						loader : new Ext.tree.TreeLoader({
							baseAttrs : {},
							dataUrl : './customer.ered?reqCode=departmentTreeInit'
						}),
						root : addRoot,
						autoScroll : true,
						animate : false,
						useArrows : false,
						border : false
					});
					// 监听下拉树的节点单击事件
				   disAddDeptTree.on('click', function(node) {
					   disComboxWithTree.setValue(node.text);
					   disComboxWithTree.collapse();
						var deptid=node.attributes.id;
						//userCombo.reset();
						disUserStore.load({
									params : {
										deptid : deptid
									}
								});
					});
				   
				   var disComboxWithTree = new Ext.form.ComboBox(
							{
								id : 'disDeptname',
								store : new Ext.data.SimpleStore({
									fields : [],
									data : [ [] ]
								}),
								editable : false,
								value : ' ',
								emptyText : '请选择...',
								fieldLabel : '分配给部门',
								anchor : '100%',
								mode : 'local',
								triggerAction : 'all',
							    width:120,
								// 下拉框的显示模板,addDeptTreeDiv作为显示下拉树的容器
								tpl : "<tpl for='.'><div style='height:150px'><div id='selectTreeDiv'></div></div></tpl>",
								allowBlank : false,
								onSelect : Ext.emptyFn
							});
						   // 监听下拉框的下拉展开事件
				           disComboxWithTree.on('expand', function() {
							// 将UI树挂到treeDiv容器
				        	   disAddDeptTree.render('selectTreeDiv');
							// addDeptTree.root.expand(); //只是第一次下拉会加载数据
				        	   disAddDeptTree.root.reload(); // 每次下拉都会加载数据
							//Ext.MessageBox.alert('提示', '人员数据保存失败:<br>');
				       });
				   
				       var disUserStore = new Ext.data.Store({
								proxy : new Ext.data.HttpProxy({
											url : './customer.ered?reqCode=cascadeUserFromDepartment'
										}),
								reader : new Ext.data.JsonReader({}, [{
													name : 'userid'
												}, {
													name : 'username'
												}]),
								baseParams : {
									
								},
								listeners:{
									load:function()
									{
										//userCombo.setValue(userCombo.getValue());  
									}
								}
							});        
				       var disSM = new Ext.grid.CheckboxSelectionModel();
				       var empCM = new Ext.grid.ColumnModel([{
							header : 'userid', // 列标题
							dataIndex : 'userid', // 数据索引:和Store模型对应
						    hidden:true
							},disSM,
							{
								header : '内容',
								dataIndex : 'username',
							}]);
				   var disGrid = new Ext.grid.GridPanel({
					// 表格面板标题,默认为粗体，我不喜欢粗体，这里设置样式将其格式为正常字体
						title : '<span style="font-weight:normal">已选择客户</span>',
						width:150,
						height : 300,
						autoScroll : true,
						frame : true,
						region : 'east', // 和VIEWPORT布局模型对应，充当center区域布局
						sm:disSM,
						tbar:[
                             disComboxWithTree
						],
						store : disUserStore, // 数据存储
						stripeRows : true, // 斑马线
						cm : empCM, // 列模型
						viewConfig : {
			            // 不产横向生滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
						// forceFit : true
						},
						loadMask : {
							msg : '正在加载表格数据,请稍等...'
						}
				   });
				   
				 //Form the intergrated window
				   var disWindow = new Ext.Window({
						title : '<span style="font-weight:normal">客户分配<span>', // 窗口标题
						layout : 'border', // 设置窗口布局模式
						width : 450, // 窗口宽度
						height : 500, // 窗口高度
						//closable : false, // 是否可关闭
						collapsible : true, // 是否可收缩
						//maximizable : true, // 设置是否可以最大化
						border : false, // 边框线设置
						constrain : true, // 设置窗口是否可以溢出父容器
						animateTarget : Ext.getBody(),
						pageY : 20, // 页面定位Y坐标
						pageX : document.body.clientWidth / 2 - 600 / 2, // 页面定位X坐标
						items : [selectedGrid,btnPanel,disGrid], // 嵌入的表单面板
						close:function(){ 
							    this.hide();
							} 
					});
				   
				   //Functions
				   function disCustsToEmps()
				   {
					 
					   var rows = grid.getSelectionModel().getSelections();
					   disStore = new Ext.data.Store();
					   
					   disStore.add(rows); 
					   selectedGrid.reconfigure(disStore, selectedCustomersCM);
					   disWindow.show();
				   }
				   function doDispatch()
				   { 
					   var custRows=disStore.getRange();
					   var emprows = disGrid.getSelectionModel().getSelections();
						if (Ext.isEmpty(custRows) ||Ext.isEmpty(emprows) ) {
							Ext.Msg.alert('提示', '请先选中客户/员工!');
							return;
						}
						var custChecked=jsArray2JsString(custRows, 'id');
						var empChecked = jsArray2JsString(emprows, 'userid');
						Ext.Msg
								.confirm(
										'请确认',
										'确认分配吗?',
										function(btn, text) {
											if (btn == 'yes') {
												showWaitMsg();
												Ext.Ajax
														.request({
															url : './customer.ered?reqCode=dispatchCustomers',
															success : function(response) {
																var resultArray = Ext.util.JSON
																		.decode(response.responseText);
																
																Ext.Msg
																		.alert(
																				'提示',
																				resultArray.msg);
																disWindow.hide();
															},
															failure : function(response) {
																var resultArray = Ext.util.JSON
																		.decode(response.responseText);
																Ext.Msg
																		.alert(
																				'提示',
																				resultArray.msg);
																disWindow.hide();
															},
															params : {
																empChecked : empChecked,
																custChecked:custChecked
															}
														});
											}
										});
				   }
			
		});
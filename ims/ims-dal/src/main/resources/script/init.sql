DROP TABLE IF EXISTS T_COMPANY;
DROP TABLE IF EXISTS T_BANK_ACCOUNT;
DROP TABLE IF EXISTS T_BANK_RECORD;
DROP TABLE IF EXISTS T_USER;

CREATE TABLE T_COMPANY
(
    id              BIGINT PRIMARY KEY AUTO_INCREMENT NOT NULL COMMENT '主键',
    regist_no       VARCHAR(32) COMMENT '注册号',
    code            VARCHAR(32) COMMENT '公司名称',
    tax_no          VARCHAR(32) COMMENT '法人',
    name            VARCHAR(256) COMMENT '余额',
    type            VARCHAR(32) COMMENT '余额',
    address         VARCHAR(32) COMMENT '余额',
    legal_person    VARCHAR(32) COMMENT '余额',
    regist_capital  DOUBLE COMMENT '余额',
    scope           VARCHAR(32) COMMENT '余额',
    create_time     DATETIME COMMENT '余额',
    expire_time     DATETIME COMMENT '余额'
);

CREATE TABLE T_BANK_ACCOUNT
(
    id         BIGINT PRIMARY KEY AUTO_INCREMENT NOT NULL COMMENT '主键',
    account    VARCHAR(256) NOT NULL COMMENT '账号',
    company    VARCHAR(256) NOT NULL COMMENT '公司名称',
    legal      VARCHAR(256) NOT NULL COMMENT '法人',
    balance    DOUBLE COMMENT '余额',
    createTime DATETIME NOT NULL COMMENT '开户时间'
);

CREATE TABLE T_BANK_RECORD
(
    id         BIGINT PRIMARY KEY AUTO_INCREMENT NOT NULL COMMENT '主键',
    account    VARCHAR(256) NOT NULL COMMENT '账号',
    op_type    VARCHAR(256) NOT NULL COMMENT '操作',
    op_time    VARCHAR(256) NOT NULL COMMENT '操作时间',
    amount     DOUBLE COMMENT '发生金额',
    balance    DOUBLE COMMENT '余额'
);

CREATE TABLE T_USER
(
    id          BIGINT PRIMARY KEY AUTO_INCREMENT NOT NULL COMMENT '主键',
    name        VARCHAR(32) NOT NULL COMMENT '账号',
    pwd         VARCHAR(128) NOT NULL COMMENT '操作',
    role        VARCHAR(128) NOT NULL COMMENT '操作时间',
    status      VARCHAR(16) COMMENT '余额',
    create_time DATETIME COMMENT '发生金额'
);

CREATE UNIQUE INDEX T_BANK_ACCOUNT_IDX1 ON T_BANK_ACCOUNT_IDX1 (account);
CREATE UNIQUE INDEX T_BANK_RECORD_IDX1 ON T_BANK_RECORD (account, op_time);
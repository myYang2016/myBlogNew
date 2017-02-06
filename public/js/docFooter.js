/**
 * Created by admin on 2017/1/11.
 */
var isSigned = false, user = '';
var DocForm = React.createClass({
    getName: function () {
        $.ajax({
            url: this.props.cookieUrl,
            dataType: 'json',
            cache: false,
            success: (data) => {
                this.setState({isSigned: !!data});
                user = data;
                isSigned = !!data;
            },
            error: (xhr, status, err) => {
                console.error(err.toString());
            }
        })
    },
    getInitialState: () => {
        return {isSigned: false}
    },
    componentDidMount: function () {
        this.getName();
    },
    render: function () {
        return (
            <div className="yourComments">
                <h4 className="yourEva">你的评论{this.state.isSigned ? '' : <span> (请先填写您的相关信息)</span>}</h4>
                <form action={this.state.isSigned ? "/api/evaPost" : "/api/registerPost"} method="post"
                      encType="multipart/form-data" role="form">
                    {
                        (() => this.state.isSigned ?
                            <div>
                                    <textarea name="comments" className="doc_comments" cols="30" rows="10"
                                              placeholder="请输入您的评论"></textarea>
                            </div> :
                            <div>
                                <input name="visitorName" className="form-control" type="text"
                                       placeholder="请输入您的姓名（必填）" required="required"/>
                                <input name="visitorAddress" className="form-control" type="text"
                                       placeholder="请输入您的邮箱地址（必填）" required="required"/>
                                <input name="visitorWeb" className="form-control" type="text"
                                       placeholder="请输入您的网址"/>
                            </div>)()
                    }
                    <input type="hidden" value={$('#docFooter').attr('data-title')} name="articleTitle"/>
                    <input type="submit" value="提交" className="btn_comments_sub btn"/>
                </form>
            </div>
        )
    }
});
var setTime_like, preIndex;
var Like = React.createClass({
    changeLike: function () {
        if (setTime_like && this.props.index == preIndex) clearTimeout(setTime_like);
        preIndex = this.props.index;
        if (isSigned) {
            this.setState({
                isActiveLike: !this.state.isActiveLike,
                num: this.state.isActiveLike ? --this.state.num : ++this.state.num,
                isFirst: false
            });
            setTime_like = setTimeout(() => {
                console.log(this.state.isActiveLike);
                var data = {
                    title: $('#docFooter').attr('data-title'),
                    index: this.props.index,
                    isActive: this.state.isActiveLike,
                    num: this.state.num
                };
                $.ajax({
                    url: '/api/postLike',
                    type: 'post',
                    dataType: 'json',
                    cache: false,
                    data: data,
                    success: (data) => {
                        console.log(data);
                    },
                    error: (xhr, status, err) => {
                        console.error(err.toString());
                    }
                })
            }, 1000);

        } else {
            alert('请先填写信息');
        }
        return false;
    },
    getInitialState: function () {
        return {isActiveLike: this.props.likeActive == 'true', num: this.props.like, isFirst: true}
    },
    render: function () {
        return (
            <div
                className={this.state.isActiveLike || (this.state.isFirst && this.props.likeActive == 'true') ? 'glyphicon glyphicon-thumbs-up like active' : 'glyphicon glyphicon-thumbs-up like'}
                onClick={this.changeLike}><span>{this.state.num}</span></div>
        )
    }
});
var Comments = React.createClass({
    getCommentsMsg: function () {
        $.ajax({
            url: '/api/getComments',
            dataType: 'json',
            cache: false,
            data: {title: $('#docFooter').attr('data-title')},
            success: (data) => {
                this.setState({comments: data.comments, likeArr: data.like[user]});
            },
            error: (xhr, status, err) => {
                console.error(err.toString());
            }
        })
    },
    getInitialState: () => {
        return {comments: [], likeArr: []}
    },
    componentDidMount: function () {
        this.getCommentsMsg();
    },
    render: function () {
        var commentsMsg = this.state.comments;
        return (
            <div>
                <h4 className="title">{commentsMsg.length ? '评论' : ''}</h4>
                <ul className="comments">
                    {
                        commentsMsg.map((obj, index) =>
                            <li key={index}>
                                <div>
                                    <h5 className="visitorName">{obj.visitorName + ':'}</h5>
                                    <Like like={obj.like} index={index}
                                          likeActive={user && this.state.likeArr ? this.state.likeArr[index] : ''}/>
                                </div>
                                <div className="txt">{obj.comments}</div>
                                <div className="time">{obj.time}</div>
                                <button className="btn">回复</button>
                            </li>
                        )
                    }
                </ul>
            </div>
        )
    }
});
ReactDOM.render(
    <div>
        <Comments />
        <DocForm cookieUrl="/api/getCookie" getVisitor="/api/getVisitor"/>
    </div>,
    document.getElementById('docFooter')
);
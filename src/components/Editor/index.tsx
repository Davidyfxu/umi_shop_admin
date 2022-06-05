import React from 'react';
// 引入编辑器组件
import BraftEditor from 'braft-editor';
// 引入编辑器样式
import 'braft-editor/dist/index.css';
import './index.less';
import AliyunOSSUpload from '@/components/AliyunOSSUpload';
// @ts-ignore
import { ContentUtils } from 'braft-utils';

export default class EditorDemo extends React.Component<any, any> {
  state = {
    // 创建一个空的editorState作为初始值
    editorState: BraftEditor.createEditorState(this.props.content ?? null),
  };

  /* 编辑器内容改变后执行 */
  handleEditorChange = (editorState: any) => {
    this.setState({ editorState });

    // 判空
    if (!editorState.isEmpty()) {
      // 调用form方法将编辑器输入的内容传递回去
      const content = editorState.toHTML();
      this.props.setDetails(content);
    } else {
      this.props.setDetails('');
    }
  };

  /* 图片上传完成后执行此方法，用来在编辑器中显示图片 */
  insertImage = (url: string) => {
    this.setState({
      editorState: ContentUtils.insertMedias(this.state.editorState, [
        {
          type: 'IMAGE',
          url,
        },
      ]),
    });
  };

  render() {
    const { editorState } = this.state;
    // 自定义控件，插入图片
    const extendControls = [
      {
        key: 'antd-uploader',
        type: 'component',
        component: (
          <AliyunOSSUpload accept={'image/*'} showUploadList={false} insertImage={this.insertImage}>
            <button
              type="button"
              className="control-item button upload-button"
              data-title="插入图片"
            >
              插入图片
            </button>
          </AliyunOSSUpload>
        ),
      },
    ];
    return (
      <div className="my-editor">
        <BraftEditor
          value={editorState}
          onChange={this.handleEditorChange}
          extendControls={extendControls as any}
        />
      </div>
    );
  }
}

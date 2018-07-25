#if defined (VERTEX)
  in vec3 a_position;
  in vec2 a_texcoord;
  in vec3 a_normal;
  in vec3 a_tangent;
  in vec3 a_bitangent;

  uniform mat4 u_model;
  uniform mat4 u_view;
  uniform mat4 u_perspective;
  uniform mat4 u_mv;
  uniform mat4 u_mvp;
  uniform mat4 u_invertedView;

  out vec2 a_fragColor;

  void main () {
    a_fragColor = a_texcoord;
    gl_Position = u_mvp * vec4(a_position, 1.0);
  }
#endif


#if defined (FRAGMENT)
  precision mediump float;
  in vec2 a_fragColor;
  out vec4 fragColor;
  void main () {
    fragColor = vec4(1.0, 0.0, 0.0, 1.0);
  }
#endif
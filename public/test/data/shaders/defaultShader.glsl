#if defined (VERTEX)
  in vec3 a_position;
  in vec2 a_texcoord;
  in vec3 a_normal;
  in vec3 a_tangent;
  in vec3 a_bitangent;

  uniform mat4 u_mvp;

  out vec3 a_fragColor;
  out vec3 heh;

  void main () {
    heh = a_normal * a_tangent * a_bitangent * vec3(a_texcoord, 1.0);
    a_fragColor = a_normal;
    gl_Position = u_mvp * vec4(a_position, 1.0);
  }
#endif


#if defined (FRAGMENT)
  precision mediump float;
  in vec3 a_fragColor;
  out vec4 fragColor;
  void main () {
    fragColor = vec4(a_fragColor, 1.0);
  }
#endif
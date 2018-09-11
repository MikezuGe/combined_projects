#if defined (VERTEX)
  in vec3 a_position;
  in vec2 a_texcoord;
  in vec3 a_normal;
  in vec3 a_tangent;
  in vec3 a_bitangent;

  uniform mat3 u_model_rotation;
  uniform mat4 u_mvp;
  uniform mat4 u_view;
  uniform mat4 u_perspectice;
  uniform mat4 u_view_inverted;
  uniform float u_time;

  out float time;
  out vec2 texcoord;
  out vec3 vertexPosition;
  out vec3 cameraPosition;
  out vec3 lightPosition;
  out vec3 inputNormal;

  out vec3 heh;

  void main () {
    time = u_time;

    texcoord = a_texcoord;

    vertexPosition = a_position;
    cameraPosition = vec3(0.0, 0.0, 0.0);
    lightPosition = vec3(cos(time * 0.001) * 10.0, 0.0, sin(time * 0.001) * 10.0 - 10.0);
    inputNormal = normalize(transpose(inverse(u_model_rotation * mat3(u_view))) * a_normal); // Move to cpu

    heh = a_normal * a_tangent * a_bitangent;
    gl_Position = u_mvp * vec4(a_position, 1.0);
  }
#endif


#if defined (FRAGMENT)
  precision mediump float;

  in float time;
  in vec2 texcoord;
  in vec3 vertexPosition;
  in vec3 cameraPosition;
  in vec3 lightPosition;
  in vec3 inputNormal;
  uniform mat4 u_model;

  uniform sampler2D u_colortexture;
  uniform sampler2D u_normaltexture;
  uniform sampler2D u_speculartexture;

  out vec4 outColor;


  vec3 calculateLight () {
    vec3 normal = normalize(inputNormal);
    vec3 lightColor = vec3(1.0, 1.0, 1.0); // Get from uniform
    vec3 fragPosition = vec3(u_model * vec4(vertexPosition, 1.0));
    vec3 fragToLight = normalize(lightPosition - fragPosition);

    vec3 totalLight = vec3(0.0, 0.0, 0.0);

    #if defined (DIFFUSE)
      float diffuseStrength = 0.5; // Get from uniform
      float diffuse = max(dot(normal, fragToLight), 0.0);
      totalLight += (lightColor * diffuse * diffuseStrength);
    #endif

    #if defined (SPECULAR)
      float specularStrength = 0.5; // Get from uniform
      float specularShininess = 16.0; // Get from uniform
      vec3 fragToCamera = normalize(cameraPosition - fragPosition);
      vec3 halfVector = normalize(fragToLight + fragToCamera);
      float specular = pow(max(dot(normal, halfVector), 0.0), specularShininess);
      totalLight += (lightColor * specular * specularStrength);
    #endif
    
    #if defined (NORMALMAP)
    #endif
    
    #if defined (SPECULARMAP)
    #endif

    return totalLight;
  }


  void main () {
    vec3 finalColor = vec3(1.0, 0.64, 0.0); // Orange, but looks golden
    #if defined (COLORMAP)
      finalColor = texture(u_colortexture, texcoord).rgb;
    #endif
    #if defined (DIFFUSE) || defined (SPECULAR)
      finalColor *= calculateLight();
    #endif
    vec3 heh = texture(u_normaltexture, texcoord).rgb * texture(u_speculartexture, texcoord).rgb;
    outColor = vec4(finalColor, 1.0);
  }
#endif
